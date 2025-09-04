"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer"; // server action

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    // Frontend validation
    if (!number.trim()) {
      setMessage("Recipient number cannot be empty ");
      return;
    }
    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      setMessage("Amount must be a positive number ");
      return;
    }

    setLoading(true);
    setMessage(""); // clear previous message

    try {
      const result = await p2pTransfer(number, Number(amount) * 100);

      if (result.success) {
        setMessage("Transfer successful ");
        setNumber("");
        setAmount("");
      } else {
        setMessage(result.message || "Transfer failed ");
      }
    } catch (error: any) {
      setMessage(error?.message || "Something went wrong ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <Card title="Send" className="min-w-[18rem] p-4">
        <TextInput
          placeholder="Recipient Number"
          label="Number"
          value={number}
          onChange={(value: string) => setNumber(value)}
          className="mb-2"
        />
        <TextInput
          placeholder="Amount"
          label="Amount"
          value={amount}
          onChange={(value: string) => setAmount(value)}
          className="mb-4"
        />
       <div className="pt-4 flex justify-center">
              <Button onClick={handleSend} disabled={loading}>{loading ? "Sending..." : "Send"}</Button>
            </div>
        {message && (
          <p
            className={`mt-4 font-medium ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </Card>
    </div>
  );
}
