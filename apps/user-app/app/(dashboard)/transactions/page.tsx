import { CiWallet } from "react-icons/ci";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

// Fetch P2P transactions
async function getP2pTransactions(userId: number) {
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      OR: [{ fromUserId: userId }, { toUserId: userId }],
    },
    orderBy: { timestamp: "desc" },
    take: 5,
  });

  return txns.map((t) => ({
    id: t.id,
    amount: t.amount,
    timestamp: t.timestamp,
    fromUserId: t.fromUserId,
    toUserId: t.toUserId,
    type: t.fromUserId === userId ? "Sent" : "Received",
  }));
}

// Fetch OnRamp transactions
async function getOnRampTransactions(userId: number, status: string) {
  const txns = await prisma.onRampTransaction.findMany({
    where: { userId, status },
    orderBy: { startTime: "desc" },
    take: 5,
  });

  return txns.map((t) => ({
    id: t.id,
    amount: t.amount,
    timestamp: t.startTime,
    status: t.status,
    provider: t.provider || "PayTM",
  }));
}

// Reusable card renderer for OnRamp
const renderOnRampTransactions = (
  title: string,
  txns: any[],
  color: string,
  emptyMsg: string, 
  sign : string,
) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border">
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    {txns.length > 0 ? (
      <ul className="space-y-3">
        {txns.map((txn) => (
          <li key={txn.id} className="flex justify-between items-center border-t pt-2">
            <div>
              <p className="font-medium">Received INR</p>
              <p className="text-sm text-gray-500">{txn.timestamp.toDateString()}</p>
            </div>
            <div className="text-right">
              <div className="flex gap-1">
                {sign}
<p className="font-semibold">₹{txn.amount / 100}</p>
              </div>
              
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

// Reusable card renderer for P2P
const renderP2pTransactions = (
  title: string,
  txns: any[],
  emptyMsg: string, 
  sign : string
) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border">
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    {txns.length > 0 ? (
      <ul className="space-y-3">
        {txns.map((txn) => (
          <li key={txn.id} className="flex justify-between items-center border-t pt-2">
            <div>
              <p className="font-medium">{txn.type} INR</p>
              <p className="text-sm text-gray-500">{txn.timestamp.toDateString()}</p>
            </div>
            <div className="text-right">
            <div className="flex justify-center items-center gap-1">
               <p>{sign}</p>
              <p className="font-semibold">₹{txn.amount / 100}</p>
            </div>
             
              <span className="text-green-500">Success</span>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 text-center py-6">{emptyMsg}</p>
    )}
  </div>
);

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  // Fetch all transactions
  const [successTxns, pendingTxns, failedTxns, p2pTxns] = await Promise.all([
    getOnRampTransactions(userId, "Success"),
    getOnRampTransactions(userId, "Processing"),
    getOnRampTransactions(userId, "Failure"),
    getP2pTransactions(userId),
  ]);

  const sentMoney = p2pTxns.filter((txn) => txn.type === "Sent");   
  const receivedMoney = p2pTxns.filter((txn) => txn.type === "Received");


  // const sentMoney = p2pTxns.filter(())
  return (
    <div className="w-full min-h-screen flex flex-col ">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">
          <span className="text-purple-500">PayLoad</span> Transactions
        </h1>
        <p className="text-gray-600 mt-2 italic">
          Secure and simple way to manage your transactions.
        </p>
      </div>

      {/* P2P Transactions */}
      <div className="max-w-3xl mx-auto w-full px-4 py-8 mb-2">
        <h2 className="text-2xl font-bold flex items-center justify-start gap-2 mb-6">
          <CiWallet className="text-blue-500" />
          <span className="text-purple-500">P2P Transactions</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderP2pTransactions("Sent Transactions", sentMoney, "No sent payments", "-")}
          {renderP2pTransactions("Received Transactions", receivedMoney, "No received payments", "+")}
        </div>
      </div>

      {/* OnRamp Transactions */}
      <div className="max-w-3xl mx-auto w-full px-4 py-8">
        <h2 className="text-2xl font-bold flex items-center justify-start gap-2 mb-6">
          <CiWallet className="text-blue-500" />
          <span className="text-purple-500">Wallet Transactions</span>
        </h2>

        <div className="mb-6">
          {renderOnRampTransactions(
            "Successful Transactions",
            successTxns,
            "text-green-600",
            "No recent transactions", 
            "+"
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderOnRampTransactions(
            "Processing Transactions",
            pendingTxns,
            "text-yellow-600",
            "No recent transactions", 
            ""
          )}
          {renderOnRampTransactions(
            "Failed Transactions",
            failedTxns,
            "text-red-600",
            "No recent transactions", 
            ""
          )}
        </div>
      </div>
    </div>
  );
}
