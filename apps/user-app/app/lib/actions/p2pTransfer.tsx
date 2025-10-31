"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { PrismaClient } from "@prisma/client";

// export async function p2pTransfer(to: string, amount: number) {
//   console.log("💡 [p2pTransfer] Starting transfer:", { to, amount });
//   try {
//     const session = await getServerSession(authOptions);
//     const from = session?.user?.id;
//     if (!from) {
//       console.log("❌ Not authenticated");
//       return { success: false, message: "User not authenticated" };
//     }

//     const toUser = await prisma.user.findFirst({
//       where: { number: to },
//     });
//     if (!toUser) {
//       console.log("❌ Recipient not found");
//       return { success: false, message: "Recipient not found" };
//     }

//     if (amount <= 0) {
//       console.log("❌ Invalid amount");
//       return { success: false, message: "Invalid amount" };
//     }

//     const fromBalance = await prisma.balance.findUnique({
//       where: { userId: Number(from) },
//     });
//     if (!fromBalance) {
//       console.log("❌ Sender balance not found");
//       return { success: false, message: "Sender balance not found" };
//     }

//     if (fromBalance.amount < amount) {
//       console.log("❌ Insufficient balance");
//       return { success: false, message: "Insufficient balance" };
//     }

//     console.log("✅ Performing transaction");
//     await prisma.$transaction(async (tx: PrismaClient) => {
//       await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

//       await tx.balance.update({
//         where: { userId: Number(from) },
//         data: { amount: { decrement: amount } },
//       });

//       await tx.balance.update({
//         where: { userId: toUser.id },
//         data: { amount: { increment: amount } },
//       });

//       await tx.p2pTransfer.create({
//         data: {
//           fromUserId: Number(from),
//           toUserId: toUser.id,
//           amount,
//           status: "Success",
//           timestamp: new Date(),
//         },
//       });
//     });

//     console.log("✅ Transfer successful");
//     return { success: true, message: "Transfer successful" };
//   } catch (error: any) {
//     console.error("🚨 Transfer error:", error);
//     return {
//       success: false,
//       message: error.message || "Transfer failed. Please try again.",
//     };
//   }
// }


export async function p2pTransfer(to: string, amount: number) {
  console.log("💡 [p2pTransfer] Starting transfer:", { to, amount });

  try {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) return { success: false, message: "User not authenticated" };

    const toUser = await prisma.user.findFirst({ where: { number: to } });
    if (!toUser) return { success: false, message: "Recipient not found" };
    if (amount <= 0) return { success: false, message: "Invalid amount" };

    const fromBalance = await prisma.balance.findUnique({
      where: { userId: Number(from) },
    });
    if (!fromBalance)
      return { success: false, message: "Sender balance not found" };
    if (fromBalance.amount < amount)
      return { success: false, message: "Insufficient balance" };

    console.log("✅ Performing transaction");

    try {
      await prisma.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

        await tx.balance.update({
          where: { userId: Number(from) },
          data: { amount: { decrement: amount } },
        });

        await tx.balance.update({
          where: { userId: toUser.id },
          data: { amount: { increment: amount } },
        });

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

      console.log("✅ Transfer successful");
      return { success: true, message: "Transfer successful" };
    } catch (dbError: any) {
      console.error("💥 Database error during transaction:", dbError);
      return { success: false, message: "Database transaction failed" };
    }
  } catch (error: any) {
    console.error("🚨 Transfer error:", error);
    return {
      success: false,
      message: error.message || "Transfer failed. Please try again.",
    };
  }
}
