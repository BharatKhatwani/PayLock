"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import toast from "react-hot-toast";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTxn";

// ✅ Supported banks list
const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl: "/Banks/hdfc" },
  { name: "Axis Bank", redirectUrl: "/Banks/axis" },
];

export const AddMoney = () => {
  const [amount, setAmount] = useState<number>(0);
  const [provider, setProvider] = useState<string>(SUPPORTED_BANKS[0]?.name || "");
  const [redirectUrl, setRedirectUrl] = useState<string>(SUPPORTED_BANKS[0]?.redirectUrl || "");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  
  const [error, setError] = useState<string | null>(null);

  // 🔹 function to handle "Add Money" button click
  const handleAddMoney = async () => {
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!provider) {
      toast.error("Please select a bank");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // console.log("Sending request:", amount, provider);
      const result = await createOnRampTransaction(amount * 100, provider);

      if (result.success) {
        toast.success(result.message || "Money added successfully!");
        setAmount(0);

        if (redirectUrl) {
          // open mock bank redirect page
          window.open(`${redirectUrl}?amount=${amount}`, "_blank");
        }
      } else {
        toast.error(result.message || "Failed to add money. Please try again.");
      }
    } catch (err: any) {
      console.error("Error in add money:", err);
      setError("Try after some time");

      // show user-friendly message
      const errorMessage = err?.message || "Failed to process payment. Please try again later.";
      toast.error(errorMessage);

      if (errorMessage.includes("Payment service is currently unavailable")) {
        toast("Our payment service is temporarily unavailable. Please try again in a few minutes.", {
          icon: "ℹ️",
          duration: 5000,
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card title="Add Money">
      <div className="w-full space-y-4">
        {/* 🔹 Input Field */}
        <TextInput
          label="Amount"
          placeholder="Enter amount"
          type="number"
          min="1"
          value={amount || ""}
          onChange={(value: string) => setAmount(Number(value))}
          disabled={isProcessing}
        />

        {/* 🔹 Select Bank */}
        <div className="text-left font-medium">Bank</div>
        <Select
          onSelect={(value: string) => {
            const bank = SUPPORTED_BANKS.find((x) => x.name === value);
            if (bank) {
              setProvider(bank.name);
              setRedirectUrl(bank.redirectUrl);
            }
          }}
          options={SUPPORTED_BANKS.map((x) => ({ key: x.name, value: x.name }))}
          disabled={isProcessing}
        />

        {/* 🔹 Action Button */}
        <div className="flex justify-center pt-2">
          <Button
            onClick={handleAddMoney}
            disabled={isProcessing || amount <= 0 || !provider}
          >
            {isProcessing ? "Processing..." : "Add Money"}
          </Button>
        </div>

        
        {isProcessing && (
          <div className="text-center text-sm text-gray-600">
            Processing your request. Please wait...
          </div>
        )}

        {error && (
          <div className=" Error : text-center text-sm text-red-500">
            {error}
          </div>
        )}
      </div>
    </Card>
  );
};
