// app/(dashboard)/dashboard/page.tsx
import { CiWallet, CiSearch } from "react-icons/ci";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import Link from "next/link";
import { OnRampTransaction } from "../../../components/OnRampTransaction";

async function getUserBalance(userId: number) {
  const balance = await prisma.balance.findUnique({ where: { userId } });
  return balance || { amount: 0, locked: 0 };
}

async function getTransactions(userId: number) {
  try {
    const transactions = await prisma.onRampTransaction.findMany({
      where: { userId },
      orderBy: { startTime: "desc" },
      take: 5,
    });

    return transactions.map((t) => ({
      ...t,
      time: t.startTime ? new Date(t.startTime) : new Date(),
      status: t.status || "Pending",
      provider: t.provider || "PayTM",
    }));
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;

  if (!userId) {
    return <div className="text-center mt-20">Please login to access the dashboard.</div>;
  }

  const balance = await getUserBalance(userId);
  const amountInRupees = balance.amount / 100;
  const transactions = await getTransactions(userId);

  return (
    <div className="w-full min-h-screen  flex justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-4xl flex flex-col items-center gap-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            <span className="text-purple-500">PayLoad</span> Dashboard
          </h1>
          <p className="mt-2 text-gray-600 italic">
            Your smart wallet for effortless money management
          </p>
        </div>

        {/* Balance Card */}
        <div className="w-full flex justify-center mt-5">
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
        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <OnRampTransaction transactions={transactions} />
        </div>

        {/* Action Boxes */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* Quick Search Box */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <CiSearch className="text-blue-500 text-2xl" /> Quick Search
            </h2>
            <p className="text-gray-500">Transfer money to your contacts instantly.</p>
            <Link href="/p2p" className="mt-4 w-full">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                Send Money
              </button>
            </Link>
          </div>

          {/* Add Funds Box */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaMoneyBillWave className="text-green-500 text-2xl" /> Add Funds
            </h2>
            <p className="text-gray-500">Top up your PayLoad wallet easily.</p>
            <Link href="/transfer" className="mt-4 w-full">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                Add Money
              </button>
            </Link>
          </div>
        </div>

        {/* Spending Insights */}
        <div className="w-full rounded-xl border border-gray-200 p-4 mt-6 flex flex-col gap-2">
          <h1 className="text-xl font-semibold">Spending Insights</h1>
          <p className="text-gray-500">
            Track your spending patterns and manage your budget more effectively.
          </p>
          <Link
            href="/transactions"
            className="cursor-pointer flex items-center gap-2 mt-2 text-purple-500 font-semibold"
          >
            <span>View Analytics Details</span>
            <IoIosArrowRoundForward />
          </Link>
        </div>
      </div>
    </div>
  );
}
