"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import axios from "axios";
import { OnRampStatus } from "@prisma/client";

// Enum for transaction status


const BANK_WEBHOOK_URL =process.env.BANK_WEBHOOK_URL!
  // console.log(BANK_WEBHOOK_URL)

if (!BANK_WEBHOOK_URL) {
  throw new Error("BANK_WEBHOOK_URL is not defined in environment variables");
}
export async function createOnRampTransaction(amount: number, provider: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized user");
  }

  // Generate a random token
  const token = Math.random().toString(36).substring(2, 10);

  // ✅ FIX: Add startTime
  const transaction = await prisma.onRampTransaction.create({
    data: {
      userId: Number(session.user.id),
      amount,
      provider,
      status: OnRampStatus.Processing,
      token,
      startTime: new Date(), // ✅ <-- this fixes your Prisma error
    },
  });

  console.log("Transaction created:", transaction);

  try {
    // Simulate webhook (bank call)
    const webhookResponse = await axios.post(BANK_WEBHOOK_URL, {
      amount,
      token,
      userId: session.user.id,
    });

    console.log("Webhook response:", webhookResponse.data);

    await prisma.onRampTransaction.update({
      where: { id: transaction.id },
      data: { status: OnRampStatus.Success },
    });

    return {
      success: true,
      message: "Money added successfully via webhook",
    };
  } catch (error) {
    console.error("Webhook error:", error);

    await prisma.onRampTransaction.update({
      where: { id: transaction.id },
      data: { status: OnRampStatus.Failure },
    });

    throw new Error("Failed to process payment through webhook.");
  }
}
