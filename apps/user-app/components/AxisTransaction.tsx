"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

export default function AxisTransactionDemoPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState("");
  const transactionProcessed = useRef(false);

  useEffect(() => {
    const processTransaction = async () => {
      if (transactionProcessed.current) return;
      transactionProcessed.current = true;

      try {
        const urlParams = new URLSearchParams(window.location.search);
        const amount = urlParams.get("amount");

        if (amount) {
          const numericAmount = parseFloat(amount);

          if (numericAmount <= 0) {
            setMessage("Transaction amount must be greater than zero.");
            setIsComplete(false);
          } else if (numericAmount > 1000000) {
            setMessage("Transaction amount exceeds the limit.");
            setIsComplete(false);
          } else {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsComplete(true);
            setMessage(
              `Transaction of ₹${numericAmount.toFixed(
                2
              )} completed successfully (Demo)`
            );
          }
        } else {
          setMessage("Invalid transaction amount.");
        }
      } catch (error) {
        setMessage("Transaction failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    processTransaction();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-[#12478C] text-white py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="text-xl font-bold">AXIS BANK</div>
          <nav className="w-full sm:w-auto">
            <ul className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-6 text-xs sm:text-sm">
              <li className="hover:underline cursor-pointer">Personal</li>
              <li className="hover:underline cursor-pointer">Corporate</li>
              <li className="hover:underline cursor-pointer">NRI</li>
              <li className="hover:underline cursor-pointer">Priority</li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="bg-white shadow-md rounded-xl p-5 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl">
          <h1 className="text-xl sm:text-2xl font-bold text-[#12478C] mb-6 text-center">
            Transaction Processing (Demo)
          </h1>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 animate-spin text-[#12478C]" />
              <p className="text-base sm:text-lg font-semibold text-[#12478C]">
                Processing your transaction...
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                Please do not refresh or close this page.
              </p>
            </div>
          ) : isComplete ? (
            <div className="text-center space-y-4">
              <svg
                className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h2 className="text-xl sm:text-2xl font-bold text-green-600">
                Transaction Successful!
              </h2>
              <p className="text-sm sm:text-lg">{message}</p>
              <p className="text-xs sm:text-sm text-gray-600 break-words">
                Transaction ID (Demo): AXIS
                {Math.random().toString(36).substring(2, 11).toUpperCase()}
              </p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <svg
                className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <h2 className="text-xl sm:text-2xl font-bold text-red-600">
                Transaction Failed
              </h2>
              <p className="text-sm sm:text-lg">{message}</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#12478C] text-white text-center text-xs sm:text-sm py-4 px-2">
        © 2025 Axis Bank Ltd. All rights reserved. | Demo Mode
      </footer>
    </div>
  );
}