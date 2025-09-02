import express from 'express';
import db from '@repo/db/client';
import { z } from 'zod';
import { Request, Response } from "express";


const PORT = process.env.PORT || 3003;
const app = express();
app.use(express.json());

// ✅ Schema validation
const TransactionSchema = z.object({
  userId: z.number(),
  amount: z.number().positive(),
  token: z.string().min(1),
});

// ✅ Process pending transactions on startup
async function processPendingTransactions() {
  try {
    const pendingTransactions = await db.onRampTransaction.findMany({
      where: { status: 'Processing' },
    });

    for (const tx of pendingTransactions) {
      await db.$transaction([
        db.balance.update({
          where: { userId: tx.userId },
          data: { amount: { increment: tx.amount } },
        }),
        db.onRampTransaction.update({
          where: { id: tx.id },
          data: { status: 'Success' },
        }),
      ]);
    }

    console.log(`Processed ${pendingTransactions.length} pending transactions.`);
  } catch (error) {
    console.error('Error processing pending transactions:', error);
  }
}

// ✅ Webhook handler
app.post("/hdfcWebhook", async (req: Request, res: Response) => {
  const result = TransactionSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid payload', errors: result.error.errors });
  }

  const { userId, amount, token } = result.data;

  try {
    await db.$transaction([
      db.balance.update({
        where: { userId },
        data: { amount: { increment: amount } },
      }),
      db.onRampTransaction.update({
        where: { token },
        data: { status: 'Success' },
      }),
    ]);

    return res.status(200).json({ message: 'Captured payment' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return res.status(500).json({ message: 'Error while processing webhook' });
  }
});

// ✅ Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await processPendingTransactions();
});
