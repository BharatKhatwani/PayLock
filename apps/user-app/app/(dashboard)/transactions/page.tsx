import { CiWallet } from "react-icons/ci";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getOnRampTransactions(userId: number, status: string) {
  const txns = await prisma.onRampTransaction.findMany({
    where: { userId, status  },
    orderBy: { startTime: "desc" },
    take: 5,
  });

  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: String(t.status),
    provider: t.provider || "PayTM",
  }));
}

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const [successTxns, pendingTxns, failedTxns] = await Promise.all([
    getOnRampTransactions(userId, "Success"),
    getOnRampTransactions(userId, "Processing"),
    getOnRampTransactions(userId, "Failure"),
  ]);

  const renderTransactions = (
    title: string,
    txns: any[],
    color: string,
    emptyMsg: string,
    extraClasses: string = ""
  ) => (
    <div
      className={`bg-white p-5 rounded-xl shadow-sm border ${extraClasses}`}
    >
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {txns.length > 0 ? (
        <ul className="space-y-3">
          {txns.map((txn, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center border-t pt-2"
            >
              <div>
                <p className="font-medium">Received INR</p>
                <p className="text-sm text-gray-500">
                  {txn.time.toDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">+ ₹{txn.amount / 100}</p>
                <p className={`text-sm font-medium ${color}`}>{txn.status}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-6">{emptyMsg}</p>
      )}
    </div>
  );

  return (
    <div className="w-full min-h-screen flex flex-col p-6 bg-gray-50">
      {/* Header */}
      <div className="text-left mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <CiWallet className="text-blue-500" />
          <span className="text-purple-500">Wallet</span> Transactions
        </h2>
      </div>

      {/* Centered Transaction Cards */}
      <div className="flex flex-col items-center space-y-4">
        {/* Successful card centered */}
        <div className="w-full max-w-2xl">
          {renderTransactions(
            "Successful Transactions",
            successTxns,
            "text-green-600",
            "No Recent transactions"
          )}
        </div>

        {/* Processing + Failure cards grouped & centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          {renderTransactions(
            "Processing Transactions",
            pendingTxns,
            "text-yellow-600",
            "No Recent transactions"
          )}
          {renderTransactions(
            "Failure Transactions",
            failedTxns,
            "text-red-600",
            "No Recent transactions"
          )}
        </div>
      </div>
    </div>
  );
}
