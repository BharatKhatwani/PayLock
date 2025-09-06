'use client';

import Link from 'next/link';
import { GoArrowRight } from "react-icons/go";
import { CiWallet, CiLock } from "react-icons/ci";
import { FaExchangeAlt, FaChartLine } from "react-icons/fa";
import React from "react";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-200 w-full">

      {/* Hero Section */}
      <section className="text-center py-32 bg-gray-200 w-full">
        <h1 className="text-5xl font-bold">
          Manage your money with ease, <span className="text-[#12478C]">PayLoad</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Top-up wallet, send money to anyone, and track transactions securely.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/auth" className="flex items-center gap-2 bg-[#12478C] text-white px-6 py-3 rounded-xl hover:bg-[#12478C]-600 transition">
            Get Started
            <GoArrowRight size={24}/>
          </Link>
        </div>
      </section>

      {/* Key Features at a Glance */}
      <section className="py-10 px-4 md:px-20 w-full text-center">
        <h2 className="text-3xl font-bold mb-8">Key Features at a Glance</h2>
        <div className="flex flex-col md:flex-row justify-center gap-10 flex-wrap">
          <MiniFeature icon={<CiLock className="text-4xl text-[#12478C]" />} title="Secure Authorization" />
          <MiniFeature icon={<FaExchangeAlt className="text-4xl text-[#12478C]" />} title="Peer-to-Peer Transfers" />
          <MiniFeature icon={<CiWallet className="text-4xl text-[#12478C]" />} title="Add Funds Securely" />
          <MiniFeature icon={<FaChartLine className="text-4xl text-[#12478C]" />} title="Real-time Balance" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-20 w-full text-center">
        <h2 className="text-3xl font-bold mb-12">Why PayLoad Stands Out</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
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
        <h2 className="text-3xl font-bold">How It Works</h2>
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-10 flex-wrap">
          <Step number={1} text="Sign Up and create your account" />
          <Step number={2} text="Add money to your wallet securely" />
          <Step number={3} text="Send money to anyone instantly" />
          <Step number={4} text="Track all transactions easily" />
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 text-center w-full px-4 md:px-20">
        <h2 className="text-3xl font-bold">Secure & Reliable</h2>
        <p className="mt-4 text-gray-600">
          Your transactions are protected with top-notch security and authorization.
        </p>
        <Link href="/auth" className="mt-6 inline-flex items-center gap-2 bg-[#12478C] text-white px-6 py-3 rounded-xl hover:bg-[#12478C] transition">
          Create Your Account on PayLoad
          <GoArrowRight size={24} />
        </Link>
      </section>

    </main>
  );
}

// MiniFeature Component
function MiniFeature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[150px]">
      {icon}
      <p className="mt-2 text-gray-700 font-semibold">{title}</p>
    </div>
  );
}

// FeatureCard Component
function FeatureCard({ Icon, title, description }: { Icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="p-6 border rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center gap-4 bg-white max-w-xs min-h-[220px]">
      <Icon className="text-3xl text-[#12478C]" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

// Step Component
function Step({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[150px]">
      <div className="bg-[#12478C] text-white w-12 h-12 flex items-center justify-center rounded-full font-bold">{number}</div>
      <p className="mt-2 text-gray-700">{text}</p>
    </div>
  );
}
