"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  try {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
      throw new Error("User not authenticated");
    }

    // Validate recipient
    const toUser = await prisma.user.findFirst({
      where: { number: to },
    });

    if (!toUser) {
      throw new Error("Recipient not found");
    }

    // Validate amount
    if (amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }

    await prisma.$transaction(async (tx: any) => {
      // Lock the sender's balance for the duration of the transaction
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
      
      // Check sender's balance
      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });

      if (!fromBalance) {
        throw new Error("Sender's account not found");
      }

      if (fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }

      // Perform the transfer
      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      // Record the transaction
      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(from),
          toUserId: toUser.id,
          amount,
          timestamp: new Date(),
        },
      });
    });

    return { success: true, message: "Transfer successful" };
  } catch (error: any) {
    // Re-throw the error to be caught by the client
    throw new Error(error.message || "Transfer failed. Please try again.");
  }
}
