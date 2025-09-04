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

  const handleAddMoney = async () => {
    if (amount <= 0 || !provider) {
      alert("Please enter a valid amount and select a bank.");
      return;
    }

    try {
      // Create the transaction
      await createOnRamptxn(amount * 100, provider);
      toast.success("Money is added");

      // Redirect to the bank page with amount in query params
      window.open(`${redirectUrl}?amount=${amount}`, "_blank");
    } catch (err) {
      console.error("Error creating transaction:", err);
      toast.error("Error creating transaction");
      alert("Failed to create transaction. Try again.");
    }
  };

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label="Amount"
          placeholder="Amount"
          onChange={(value: string) => setAmount(Number(value))}
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
        />

        <div className="flex justify-center pt-4">
          <Button onClick={handleAddMoney}>Add Money</Button>
        </div>
      </div>
    </Card>
  );
};
