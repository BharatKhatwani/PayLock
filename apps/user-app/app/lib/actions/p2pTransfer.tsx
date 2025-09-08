"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  let transferId: number | null = null;

  try {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
      throw new Error("User not authenticated");
    }
    console.log("Sender ID:", from);

    // Validate recipient
    const toUser = await prisma.user.findFirst({
      where: { number: to },
    });
    console.log("Recipient:", toUser);

    if (!toUser) {
      throw new Error("Recipient not found");
    }

    // Validate amount
    if (amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }

    // Create a pending transaction record first
    const transfer = await prisma.p2pTransfer.create({
      data: {
        fromUserId: Number(from),
        toUserId: toUser.id,
        amount,
        status: "Pending",
        timestamp: new Date(),
      },
    });
    transferId = transfer.id;
    console.log("Created pending transfer:", transferId);

    await prisma.$transaction(async (tx: any) => {
      // Lock the sender's balance for the duration of the transaction
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(
        from
      )} FOR UPDATE`;

      // Check sender's balance
      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });
      console.log("Sender balance:", fromBalance);

      if (!fromBalance) {
        throw new Error("Sender's account not found");
      }

      if (fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }

      // Check recipient's balance
      const toBalance = await tx.balance.findUnique({
        where: { userId: toUser.id },
      });
      console.log("Recipient balance:", toBalance);

      if (!toBalance) {
        throw new Error("Recipient's account not found");
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

      // Update the transaction status to Success
      await tx.p2pTransfer.update({
        where: { id: transferId },
        data: { status: "Success" },
      });
    });

    console.log("Transfer successful");
    return { success: true, message: "Transfer successful" };
  } catch (error: any) {
    console.log("Transfer error:", error);

    // Update transaction status to Failed if it was created
    if (transferId) {
      await prisma.p2pTransfer
        .update({
          where: { id: transferId },
          data: { status: "Failed" },
        })
        .catch(console.error);
    }

    throw new Error(error.message || "Transfer failed. Please try again.");
  }
}
