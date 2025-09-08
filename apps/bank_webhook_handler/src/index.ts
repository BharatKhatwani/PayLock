import express from 'express';
import db from '@repo/db/client';
import { z } from 'zod';
const Port = process.env.PORT || 3003;
const app = express();
app.use(express.json());
import {Request , Response} from "express"
import { ChartNoAxesColumnDecreasing } from 'lucide-react';

const TranscationSchema = z.object({
  userId: z.string(),
  amount: z.number(),
  token: z.string(),
});
// ** Function to handle pending transactions on server startup **
// async function processPendingTransactions() {
//   try {
//     const pendingTransactions = await db.onRampTransaction.findMany({
//       where: { status: 'Processing' },
//     });

//     console.log(db.balance)
//     for (const transaction of pendingTransactions) {
//       await db.$transaction([
//         db.balance.update({
//           where: { userId: transaction.userId },
//           data: {
//             amount: {
//               increment: transaction.amount, // Increment user balance by transaction amount
//             },
//           },
//         }),
//         db.onRampTransaction.update({
//           where: { id: transaction.id },
//           data: { status: 'Success' },
//         }),
//       ]);
//     }

//     console.log(
//       `Processed ${pendingTransactions.length} pending transactions.`
//     );
//   } catch (error) {
//     console.error('Error processing pending transactions:', error);
//   }
// }
app.get("/", (req: Request, res: Response) => {
  // console.log(db.balance)
  // console.log("HEty")
  res.send("Hello World");
});

app.post('/hdfcWebhook', async (req, res) => {
  const result = TranscationSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).send(result.error);
    return;
  }

  const paymentInformation = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };

  console.log("Server: Payment received via webhook:", paymentInformation.amount);

  try {
    // Only update if the transaction is still Processing
    const transaction = await db.onRampTransaction.findUnique({
      where: { token: paymentInformation.token },
    });

    if (!transaction || transaction.status !== 'Processing') {
      return res.status(400).json({ message: 'Transaction already processed or not found' });
    }

    await db.$transaction([
      db.balance.update({
        where: { userId: Number(paymentInformation.userId) },
        data: { amount: { increment: Number(paymentInformation.amount) } },
      }),
      db.onRampTransaction.update({
        where: { token: paymentInformation.token },
        data: { status: 'Success' },
      }),
    ]);

    res.status(200).json({ message: 'Captured payment' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Error while processing webhook' });
  }
});



app.listen(Port, async () => {
  console.log(`Server is running on ${Port}`);
  // await processPendingTransactions();
});