"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import toast from "react-hot-toast";
import { createOnRamptxn } from "../app/lib/actions/createOnRampTxn";

const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl: "/Banks/hdfc" },
  { name: "Axis Bank", redirectUrl: "/Banks/axis" },
];

export const AddMoney = () => {
  const [amount, setAmount] = useState<number>(0);
  const [provider, setProvider] = useState<string>(SUPPORTED_BANKS[0]?.name || "");
  const [redirectUrl, setRedirectUrl] = useState<string>(SUPPORTED_BANKS[0]?.redirectUrl || "");
  const [isProcessing, setIsProcessing] = useState(false);

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
    
    try {
      const result = await createOnRamptxn(amount * 100, provider);
      
      if (result.success) {
        toast.success(result.message || "Money added successfully!");
        // Reset form
        setAmount(0);
        
        // Open bank page in a new tab
        if (redirectUrl) {
          window.open(`${redirectUrl}?amount=${amount}`, "_blank");
        }
      } else {
        toast.error(result.message || "Failed to add money. Please try again.");
      }
    } catch (error: any) {
      console.error("Error in add money:", error);
      
      // Show user-friendly error message
      const errorMessage = error?.message || "Failed to process payment. Please try again later.";
      toast.error(errorMessage);
      
      // If it's a webhook error, suggest trying again later
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
      <div className="w-full">
        <TextInput
          label="Amount"
          placeholder="Enter amount"
          type="number" 
          min="1"
          value={amount || ""}
          onChange={(value: string) => setAmount(Number(value))}
          disabled={isProcessing}
        />

        <div className="py-4 text-left">Bank</div>

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

        <div className="flex justify-center pt-4">
          <Button 
            onClick={handleAddMoney}
            disabled={isProcessing || amount <= 0 || !provider}
          >
            {isProcessing ? "Processing..." : "Add Money"}
          </Button>
        </div>
        
        {isProcessing && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Processing your request. Please wait...
          </div>
        )}
      </div>
    </Card>
  );
};
