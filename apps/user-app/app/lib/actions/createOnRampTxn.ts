"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import axios from "axios";
import { OnRampStatus } from "@prisma/client";

const BANK_WEBHOOK_URL = "https://bank-webhook-handler.onrender.com/hdfcWebhook";
const WEBHOOK_RETRY_LIMIT = 3;
const WEBHOOK_TIMEOUT = 5000; // 5 seconds

export async function createOnRamptxn(amount: number, provider: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const token = Math.random().toString().substring(2, 7);

  // Create transaction record with 'Processing' status first
  const transaction = await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount: amount,
      provider,
      status: OnRampStatus.Processing, //  use enum
      token: token,
      startTime: new Date(),
    },
  });

  try {
    // Try to call the webhook
    await callWebhookWithRetry(amount, token, userId);

    // If webhook succeeds, update transaction status to Success
    await prisma.onRampTransaction.update({
      where: { id: transaction.id },
      data: { status: OnRampStatus.Success }, // use enum
    });

    return {
      success: true,
      message: "Money added successfully",
    };
  } catch (error: any) {
    // If webhook fails, update transaction status to Failure
    await prisma.onRampTransaction.update({
      where: { id: transaction.id },
      data: { status: OnRampStatus.Failure }, // 
    });

    throw new Error(
      error.message || "Failed to process payment. Please try again later."
    );
  }
}

async function callWebhookWithRetry(
  amount: number,
  token: string,
  userId: string,
  retryCount = 0
): Promise<void> {
  try {
    await axios.post(
      BANK_WEBHOOK_URL,
      {
        amount: amount,
        token: token,
        userId: userId,
      },
      {
        timeout: WEBHOOK_TIMEOUT,
      }
    );
  } catch (error: any) {
    if (retryCount < WEBHOOK_RETRY_LIMIT - 1) {
      // Exponential backoff before retry
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, retryCount))
      );
      return callWebhookWithRetry(amount, token, userId, retryCount + 1);
    }

    // If we've exhausted all retries, throw the error
    throw new Error(
      "Payment service is currently unavailable. Please try again later."
    );
  }
}
