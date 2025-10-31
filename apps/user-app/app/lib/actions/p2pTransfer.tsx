"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { PrismaClient } from "@prisma/client";

export async function p2pTransfer(to: string, amount: number) {
  try {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from)
      return { success: false, message: "User not authenticated" };

    // ✅ Validate recipient
    const toUser = await prisma.user.findFirst({
      where: { number: to },
    });
    if (!toUser)
      return { success: false, message: "Recipient not found" };

    // ✅ Validate amount
    if (amount <= 0)
      return { success: false, message: "Amount must be greater than 0" };

    // ✅ Check sender balance before transaction
    const fromBalance = await prisma.balance.findUnique({
      where: { userId: Number(from) },
    });

    if (!fromBalance)
      return { success: false, message: "Sender balance not found" };

    if (fromBalance.amount < amount)
      return { success: false, message: "Insufficient balance" };

    // ✅ Lock + Transaction block (only if valid)
    await prisma.$transaction(async (tx: PrismaClient) => {
      // Lock the sender’s balance row
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

      // Perform balance updates
      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      // Create successful transaction record only after success
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
    console.error("🚨 Transfer error:", error);
    return {
      success: false,
      message: error.message || "Transfer failed. Please try again.",
    };
  }
}
