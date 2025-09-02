"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";


import { HiOutlinePhone, HiLockClosed } from "react-icons/hi";
import { Info } from "lucide-react";

export default function Page() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const onlyNumber = phoneNumber.replace(/\D/g, "");

      // Use signIn with "credentials" provider
      const res = await signIn("credentials", {
        redirect: false, // important: prevents automatic redirect
        phone: onlyNumber,
        password,
      });
      console.log("signIn result:", res);

      setIsLoading(false);

      if (!res) {
        setError("Something went wrong. Please try again.");
        return;
      }

      if (res.error) {
        setError(res.error || "Invalid phone number or password.");
        return;
      }

      // On success
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 border rounded shadow-md bg-white flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">
          Welcome to <span className="text-blue-500">PayLoad</span>
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <p className="text-center text-gray-600">Login or create your account</p>

          <div className="relative">
            <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="phone"
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-2">
            <Info className="w-4 h-4 text-blue-400" />
            Demo: Phone: 1234567890, Password: 1234567890
          </p>

          <button
  type="submit"
  disabled={isLoading}
  className={`
    w-full py-3 px-4 text-white font-semibold rounded-lg
    shadow-md transition-all duration-200
    ${isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
  `}
>
  {isLoading ? "Loading..." : "Login"}
</button>

        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          By continuing, you agree to PayLaod's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
