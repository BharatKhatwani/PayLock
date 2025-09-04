import { CiWallet } from "react-icons/ci";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import Link from "next/link";
import { OnRampTransaction } from "../../../components/OnRampTransaction"; // ✅ must match export name

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  // Fetch from Prisma
  const rawTransactions = await prisma.onRampTransaction.findMany({
    where: { userId },
    orderBy: { startTime: "desc" },
    take: 5,
  });

  // ✅ Transform Prisma result into expected props
  const transactions = rawTransactions.map((t) => ({
    time: t.startTime,                 // rename startTime → time
    amount: t.amount,                  // already number
    status: String(t.status),          // ensure string (enum → string)
    provider: t.provider || "PayTM",   // fallback if needed
  }));

  return (
    <div className="w-full min-h-screen flex flex-col  p-6 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">
          <span className="text-purple-500">PayLoad</span> Transactions
        </h1>
        <p className="mt-2 text-gray-600">
          Track all your transactions effortlessly
        </p>
      </div>

      {/* Wallet Transactions */}
      <h2 className="text-2xl font-semibold mb-4 flex gap-2">
        <CiWallet className="text-purple-500" />
        Wallet Transactions
      </h2>

      {/* Transaction List */}
      <OnRampTransaction transactions={transactions} 
      // on this i need to divided the table into the sucess , failure and processing table in the good ui 
      />

      {/* Optional: Status Blocks */}
     
    </div>
  );
}
