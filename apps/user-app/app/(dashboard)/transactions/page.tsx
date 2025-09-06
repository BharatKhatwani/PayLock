import { CiWallet } from "react-icons/ci";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { TransactionList } from "../../../components/TransactionList";

// Fetch P2P transactions
async function getP2pTransactions(userId: number) {
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      OR: [{ fromUserId: userId }, { toUserId: userId }],
    },
    orderBy: { timestamp: "desc" },
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
  });

  return txns.map((t) => ({
    id: t.id,
    amount: t.amount,
    timestamp: t.startTime,
    status: t.status,
    provider: t.provider || "PayTM",
  }));
}

// Reusable renderer for OnRamp
const renderOnRampTransactions = (
  title: string,
  txns: any[],
  color: string,
  emptyMsg: string,
  sign: string
) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border">
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <TransactionList
      txns={txns}
      emptyMsg={emptyMsg}
      type="onRamp"
      color={color}
      sign={sign}
      limit={5}
    />
  </div>
);

// Reusable renderer for P2P
const renderP2pTransactions = (
  title: string,
  txns: any[],
  emptyMsg: string,
  sign: string
) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border">
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <TransactionList
      txns={txns}
      emptyMsg={emptyMsg}
      type="p2p"
      sign={sign}
      limit={5}
    />
  </div>
);

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const [successTxns, pendingTxns, failedTxns, p2pTxns] = await Promise.all([
    getOnRampTransactions(userId, "Success"),
    getOnRampTransactions(userId, "Processing"),
    getOnRampTransactions(userId, "Failure"),
    getP2pTransactions(userId),
  ]);

  const sentMoney = p2pTxns.filter((txn) => txn.type === "Sent");
  const receivedMoney = p2pTxns.filter((txn) => txn.type === "Received");

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">
          <span className="text-[#12478C]">PayLoad</span> Transactions
        </h1>
        <p className="text-gray-600 mt-2 italic">
          Secure and simple way to manage your transactions.
        </p>
      </div>

      {/* P2P Transactions */}
      <div className="max-w-3xl mx-auto w-full px-4 py-8 mb-2">
        <h2 className="text-2xl font-bold flex items-center justify-start gap-2 mb-6">
          <CiWallet className="text-blue-500" />
          <span className="text-[#12478C]">P2P Transactions</span>
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
          <span className="text-[#12478C]">Wallet Transactions</span>
        </h2>

        <div className="mb-6">
          {renderOnRampTransactions("Successful Transactions", successTxns, "text-green-600", "No recent transactions", "+")}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderOnRampTransactions("Processing Transactions", pendingTxns, "text-yellow-600", "No recent transactions", "")}
          {renderOnRampTransactions("Failed Transactions", failedTxns, "text-red-600", "No recent transactions", "")}
        </div>
      </div>
    </div>
  );
}
