"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import Image from "next/image";

import { HiOutlinePhone, HiLockClosed } from "react-icons/hi";
import { Info } from "lucide-react";

// ✅ Correct image import
import pexel from "../../public/pexels-maitree-rimthong-444156-1602726.jpg";

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
      const onlyNumber = phoneNumber.replace(/\D/g, ""); // keep digits only

      // ✅ check phone number length
      if (onlyNumber.length !== 10) {
        setIsLoading(false);
        setError("Phone number must be exactly 10 digits.");
        return;
      }

      const res = await signIn("credentials", {
        redirect: false,
        phone: onlyNumber,
        password,
      });

      setIsLoading(false);

      if (!res) {
        setError("Something went wrong. Please try again.");
        return;
      }

      if (res.error) {
        setError(res.error || "Invalid phone number or password.");
        return;
      }

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* ✅ Background Image */}
      <Image
        src={pexel}
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* ✅ Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* ✅ Centered Form with Glass Effect */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-lg bg-white/20 backdrop-blur-lg border border-white/30">
        <h1 className="text-2xl font-bold text-center text-white">
          Welcome to <span className="text-blue-300">PayLock</span>
        </h1>

        {error && <p className="text-red-300 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
          <p className="text-center text-gray-200">
            Login or create your account
          </p>

          <div className="relative">
            <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              id="phone"
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 pl-10 rounded bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="relative">
            <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 rounded bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <p className="text-sm text-gray-200 text-center flex items-center justify-center gap-2">
            <Info className="w-4 h-4 text-blue-300" />
            Demo: Phone: 1234567890, Password: 1234567890
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-3 px-4 text-white font-semibold rounded-lg
              shadow-md transition-all duration-200
              ${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-[#12478C] hover:bg-[#0e3569]"
              }
            `}
          >
            {isLoading ? "Loading..." : "Continue"}
          </button>
        </form>

        <p className="text-xs text-gray-300 text-center mt-4">
          By continuing, you agree to PayLaod's Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
}
