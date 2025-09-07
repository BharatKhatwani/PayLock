'use client';

import Link from 'next/link';
import { GoArrowRight } from "react-icons/go";
import { CiWallet, CiLock } from "react-icons/ci";
import { FaExchangeAlt, FaChartLine } from "react-icons/fa";
import React from "react";

export default function LandingPage() {
  return (
   <main className="flex flex-col items-center justify-center bg-gray-200 w-full overflow-y-hidden">

      {/* Hero Section */}
      <section className="text-center py-16 sm:py-20 lg:py-32 bg-gray-200 w-full px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Manage your money with ease, <span className="text-[#12478C]">PayLock</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Top-up wallet, send money to anyone, and track transactions securely.
        </p>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <Link 
            href="/auth" 
            className="flex items-center gap-2 bg-[#12478C] text-white px-5 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-[#0f3569] transition text-sm sm:text-base"
          >
            Get Started
            <GoArrowRight size={20} className="sm:size-6"/>
          </Link>
        </div>
      </section>

      {/* Key Features at a Glance */}
      <section className="py-12 px-4 md:px-20 w-full text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Key Features at a Glance</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          <MiniFeature icon={<CiLock className="text-3xl sm:text-4xl text-[#12478C]" />} title="Secure Authorization" />
          <MiniFeature icon={<FaExchangeAlt className="text-3xl sm:text-4xl text-[#12478C]" />} title="Peer-to-Peer Transfers" />
          <MiniFeature icon={<CiWallet className="text-3xl sm:text-4xl text-[#12478C]" />} title="Add Funds Securely" />
          <MiniFeature icon={<FaChartLine className="text-3xl sm:text-4xl text-[#12478C]" />} title="Real-time Balance" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-20 w-full text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-12">Why PayLockStands Out</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          <FeatureCard
            Icon={CiWallet}
            title="Instant Wallet Balance"
            description="Check your balance instantly and manage transactions with ease."
          />
          <FeatureCard
            Icon={FaExchangeAlt}
            title="Seamless Transfers"
            description="Send money securely to anyone, anytime with bank-grade protection."
          />
          <FeatureCard
            Icon={FaChartLine}
            title="Smart Insights"
            description="Get intelligent financial insights and track spending effectively."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 text-center px-4 md:px-20 w-full">
        <h2 className="text-2xl sm:text-3xl font-bold">How It Works</h2>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          <Step number={1} text="Sign Up and create your account" />
          <Step number={2} text="Add money to your wallet securely" />
          <Step number={3} text="Send money to anyone instantly" />
          <Step number={4} text="Track all transactions easily" />
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 text-center w-full px-4 md:px-20">
        <h2 className="text-2xl sm:text-3xl font-bold">Secure & Reliable</h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
          Your transactions are protected with top-notch security and authorization.
        </p>
        <Link 
          href="/auth" 
          className="mt-6 inline-flex items-center gap-2 bg-[#12478C] text-white px-5 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-[#0f3569] transition text-sm sm:text-base"
        >
          Create Your Account on PayLock
          <GoArrowRight size={20} className="sm:size-6"/>
        </Link>
      </section>

    </main>
  );
}

// MiniFeature Component
function MiniFeature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[100px] sm:min-w-[150px]">
      {icon}
      <p className="mt-2 text-gray-700 font-semibold text-sm sm:text-base">{title}</p>
    </div>
  );
}

// FeatureCard Component
function FeatureCard({ Icon, title, description }: { Icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="p-6 border rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center gap-4 bg-gray-200 max-w-xs sm:max-w-sm min-h-[200px]">
      <Icon className="text-2xl sm:text-3xl text-[#12478C]" />
      <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 text-xs sm:text-sm">{description}</p>
    </div>
  );
}

// Step Component
function Step({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[100px] sm:min-w-[150px] text-center">
      <div className="bg-[#12478C] text-white w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full font-bold text-sm sm:text-base">
        {number}
      </div>
      <p className="mt-2 text-gray-700 text-xs sm:text-sm md:text-base">{text}</p>
    </div>
  );
}
