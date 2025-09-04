import { CiWallet } from "react-icons/ci";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import Link from "next/link";
// import { RecentTransactions } from "../../../components/RecentTransactions"; // 👈 import client comp
import { OnRampTransaction } from "../../../components/OnRampTransaction";

async function getUserBalance(userId: number) {
  const balance = await prisma.balance.findUnique({
    where: { userId },
  });
  return balance || { amount: 0, locked: 0 };
}

async function getTransactions(userId: number) {
  try {
    const transactions = await prisma.onRampTransaction.findMany({
      where: { userId },
      orderBy: { startTime: 'desc' },
      take: 5 // Limit to 5 most recent transactions
    });
    
    // Transform the transactions to ensure time is a Date object
    return transactions.map(t => ({
      ...t,
      time: t.startTime ? new Date(t.startTime) : new Date(),
      status: t.status || 'Pending',
      provider: t.provider || 'PayTM'
    }));
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const balance = await getUserBalance(userId);
  const amountInRupees = balance.amount / 100;

  const transactions = await getTransactions(userId);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl flex flex-col items-center py-8 gap-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            <span className="text-purple-500">PayLoad</span> Dashboard
          </h1>
          <p className="mt-2 text-gray-600">Manage your finances with ease</p>
        </div>

        {/* Balance Card */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
            <CiWallet className="text-4xl text-purple-500" />
            <div className="flex flex-col">
              <span className="text-gray-500">Available Balance</span>
              <span className="text-2xl font-bold text-gray-800">
                ₹ {amountInRupees.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
         <div className="bg-white w-full shadow-lg rounded-lg overflow-hidden mb-8">
          <OnRampTransaction transactions={transactions} />
        </div>

        {/* Action Boxes */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-5xl grid md:grid-cols-2 gap-6">
            {/* Quick Search Box */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Quick Search</h2>
              <p className="text-gray-500">Transfer money to your contacts instantly.</p>
              <Link href="/p2p" className="mt-4">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
                  Send Money
                </button>
              </Link>
            </div>

            {/* Add Funds Box */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Add Funds</h2>
              <p className="text-gray-500">Top up your PayLoad wallet easily.</p>
              <Link href="/transfer" className="mt-4">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg">
                  Add Money
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
