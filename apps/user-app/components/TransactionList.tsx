"use client";
import { useState } from "react";

interface TransactionListProps {
  txns: any[];
  emptyMsg: string;
  limit?: number;
  type: "p2p" | "onRamp";
  color?: string; // only for onRamp
  sign?: string;  // + or -
}

export function TransactionList({ txns, emptyMsg, limit = 5, type, color, sign }: TransactionListProps) {
  const [showAll, setShowAll] = useState(false);

  if (!txns || txns.length === 0) {
    return <p className="text-gray-500 text-center py-6">{emptyMsg}</p>;
  }

  const visibleTxns = showAll ? txns : txns.slice(0, limit);

  return (
    <div>
      <ul className="space-y-3">
        {visibleTxns.map((txn) => (
          <li key={txn.id} className="flex justify-between items-center border-t pt-2">
            {type === "p2p" ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
          </li>
        ))}
      </ul>

      {txns.length > limit && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-4 text-blue-600 font-semibold hover:underline"
        >
          {showAll ? "Show Less" : "Show All"}
        </button>
      )}
    </div>
  );
}
