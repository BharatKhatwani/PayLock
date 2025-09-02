// app/(dashboard)/transfer/page.tsx
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { AddMoney } from "../../../components/AddMoney";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { redirect } from "next/navigation";


async function getBalance(userId: string) {
  const balance = await prisma.balance.findFirst({
    where: { userId: Number(userId) },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions(userId: string) {
  const txns = await prisma.onRampTransaction.findMany({
    where: { userId: Number(userId) },
    orderBy: { startTime: "desc" },
  });

  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function TransferPage() {
  const session = await getServerSession(authOptions);

  
  const userId = session.user.id;

  const balance = await getBalance(userId);
  const transactions = await getOnRampTransactions(userId);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold text-[#6a51a6] mb-4">Transfer</h1>
      <div className="w-full max-w-6xl flex flex-col gap-6">
        <AddMoney />
        <div className="flex flex-col md:flex-row gap-4 flex-1 overflow-y-auto">
          <div className="flex-1 flex flex-col min-w-0">
            <BalanceCard amount={balance.amount} locked={balance.locked} />
          </div>
          <div className="flex-1 flex flex-col min-w-0">
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
