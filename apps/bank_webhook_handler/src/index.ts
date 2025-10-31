import express, { Request, Response } from "express";
import db from "@repo/db/client";
import { z } from "zod";

const app = express();
app.use(express.json());

// ✅ Schema for incoming webhook payload
const TransactionSchema = z.object({
  token: z.string(),
  userId: z.coerce.number(), // 👈 converts "11" → 11
  amount: z.number(),
});

app.post("/hdfcWebhook", async (req: Request, res: Response) => {
  const result = TransactionSchema.safeParse(req.body);

  if (!result.success) {
    console.log("❌ Invalid payload:", result.error);
    return res.status(400).json({ error: result.error });
  }

  const { token, userId, amount } = result.data;

  try {
    const transaction = await db.onRampTransaction.findUnique({
      where: { token },
    });

    if (!transaction || transaction.status !== "Processing") {
      return res
        .status(400)
        .json({ message: "Transaction already processed or not found" });
    }

    // ✅ Atomically update balance + transaction
    await db.$transaction([
      db.balance.upsert({
        where: { userId },
        update: { amount: { increment: amount } },
        create: { userId, amount , locked : 0},
      }),
      db.onRampTransaction.update({
        where: { token },
        data: { status: "Success" },
      }),
    ]);

    console.log(`✅ Payment confirmed for user ${userId}, amount ${amount}`);
    res.status(200).json({ message: "Payment captured successfully" });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    res.status(500).json({ message: "Error while processing webhook" });
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`🚀 Webhook server running on port ${PORT}`));
