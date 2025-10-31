"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { PrismaClient } from "@prisma/client";

export async function p2pTransfer(to: string, amount: number) {
  try {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) return { success: false, message: "User not authenticated" };

    // ✅ Validate recipient
    const toUser = await prisma.user.findFirst({
      where: { number: to },
    });
    if (!toUser) return { success: false, message: "Recipient not found" };

    // ✅ Validate amount
    if (amount <= 0)
      return { success: false, message: "Amount must be greater than 0" };

    // ✅ Lock + Transaction block
    await prisma.$transaction(async (tx: PrismaClient) => {
      // 🔒 Lock sender’s balance row
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(
        from
      )} FOR UPDATE`;

      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });
      if (!fromBalance) throw new Error("Sender balance not found");

      // ❌ If insufficient funds → custom code (no DB record)
      if (fromBalance.amount < amount) {
        throw new Error("INSUFFICIENT_FUNDS");
      }

      const toBalance = await tx.balance.findUnique({
        where: { userId: toUser.id },
      });
      if (!toBalance) throw new Error("Recipient balance not found");

      // ✅ Perform balance updates
      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      // ✅ Create successful transaction record
      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(from),
          toUserId: toUser.id,
          amount,
          status: "Success",
          timestamp: new Date(),
        },
      });
    });

    return { success: true, message: "Transfer successful" };
  } catch (error: any) {
    // ⚙️ Handle our custom error cleanly
    if (error.message === "INSUFFICIENT_FUNDS") {
      return { success: false, message: "Insufficient balance" };
    }

    console.error("🚨 Transfer error:", error);
    return {
      success: false,
      message: error.message || "Transfer failed. Please try again.",
    };
  }
}
