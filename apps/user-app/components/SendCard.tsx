"use client";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textinput";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!number.trim()) {
      setMessage("Recipient number cannot be empty");
      return;
    }
    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      setMessage("Amount must be a positive number");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result = await p2pTransfer(number, Number(amount) * 100);
      if (result.success) {
        setMessage("Money sent successfully!");
        setNumber("");
        setAmount("");
      } else {
        setMessage(result.message || "Transfer failed");
      }
    } catch (error: any) {
      setMessage(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full mt-10">
      <Center>
     <Card title="Send Money" className="bg-white">
  <div className="min-w-80 pt-2">
    <div className="pt-2">
      <TextInput
        placeholder="Number"
        label="Number"
        value={number}
        onChange={(value) => setNumber(value)}
      />
    </div>

    <div className="pt-2">
      <TextInput
        placeholder="Amount"
        label="Amount"
        value={amount}
        onChange={(value) => setAmount(value)}
      />
    </div>

    <div className="pt-4 flex justify-center">
      <Button onClick={handleSend} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </Button>
    </div>

    {message && (
      <p
        className={`mt-4 text-center text-sm ${
          message === "Money sent successfully!"
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {message}
      </p>
    )}
  </div>
</Card>

      </Center>
    </div>
  );
}
