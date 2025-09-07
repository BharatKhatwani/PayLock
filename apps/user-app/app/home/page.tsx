'use client';

import Link from 'next/link';
import Image from 'next/image';
import { GoArrowRight } from "react-icons/go";
import { CiWallet, CiLock } from "react-icons/ci";
import { FaExchangeAlt, FaChartLine, FaLightbulb, FaRocket, FaHandshake } from "react-icons/fa";
import React from "react";
import { motion } from "framer-motion";

import gemini from '../../public/Gemini_Generated_Image_f3igvvf3igvvf3ig.png';
const MotionImage = motion(Image);

export default function LandingPage() {
  return (
    <main className="relative flex flex-col items-center justify-center bg-gray-200 w-full overflow-x-hidden overflow-y-hidden">

      {/* Animated Background Blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-[#12478C] rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-[#0f3569] rounded-full blur-3xl"
      />

      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center relative z-10">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left relative z-10"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight">
              Manage your money with ease,{" "}
              <span className="bg-gradient-to-r from-[#12478C] to-[#0f3569] bg-clip-text text-transparent">
                PayLock
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto md:mx-0">
              Top-up wallet, send money instantly, and track every transaction securely.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <Link 
                href="/auth" 
                className="flex items-center gap-2 bg-[#12478C] text-white px-6 py-3 rounded-xl hover:bg-[#0f3569] hover:shadow-lg transition text-sm sm:text-base"
              >
                Get Started
                <GoArrowRight size={20} />
              </Link>
           <button
  onClick={() => {
    const section = document.getElementById("features");
    if (section) {
      const yOffset = -100; // adjust this (navbar height or padding)
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }}
  className="px-6 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 font-semibold"
>
  Learn More
</button>

            </div>
          </motion.div>

          {/* Hero Image Floating with Glow */}
          <div className="relative flex justify-center">
            {/* Glow behind image */}
            <motion.div
              className="absolute w-[520px] h-[320px] bg-gradient-to-r from-[#12478C]/50 to-[#0f3569]/30 rounded-2xl filter blur-3xl z-0"
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Floating image */}
            <MotionImage
              src={gemini}
              alt="Wallet Dashboard"
              width={500}
              height={300}
              className="rounded-2xl relative z-10"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Additional floating blobs */}
            <motion.div
              className="absolute top-20 right-[-50px] w-32 h-32 bg-[#FF8C00] rounded-full blur-2xl opacity-30"
              animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-32 left-[-50px] w-40 h-40 bg-[#32CD32] rounded-full blur-2xl opacity-25"
              animate={{ y: [0, 25, 0], x: [0, -25, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </section>

      {/* Key Features */}
      <motion.section
        id="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="py-16 px-4 md:px-20 w-full text-center relative z-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Key Features at a Glance</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          <FadeUp><MiniFeature icon={<CiLock className="text-3xl sm:text-4xl text-[#12478C]" />} title="Secure Authorization" /></FadeUp>
          <FadeUp><MiniFeature icon={<FaExchangeAlt className="text-3xl sm:text-4xl text-[#12478C]" />} title="Peer-to-Peer Transfers" /></FadeUp>
          <FadeUp><MiniFeature icon={<CiWallet className="text-3xl sm:text-4xl text-[#12478C]" />} title="Add Funds Securely" /></FadeUp>
          <FadeUp><MiniFeature icon={<FaChartLine className="text-3xl sm:text-4xl text-[#12478C]" />} title="Real-time Balance" /></FadeUp>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 px-4 md:px-20 w-full text-center relative z-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-12">Why PayLock Stands Out</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          <FeatureCard Icon={FaLightbulb} title="Smart Insights" description="Clear breakdowns of your spending to help you stay in control." />
          <FeatureCard Icon={FaRocket} title="Fast Performance" description="Every transaction completes in seconds with high reliability." />
          <FeatureCard Icon={FaHandshake} title="Trusted by Users" description="Built with bank-grade security and trusted by professionals." />
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 text-center px-4 md:px-20 w-full relative z-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold">How It Works</h2>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          <FadeUp><Step number={1} text="Sign Up and create your account" /></FadeUp>
          <FadeUp><Step number={2} text="Add money to your wallet securely" /></FadeUp>
          <FadeUp><Step number={3} text="Send money to anyone instantly" /></FadeUp>
          <FadeUp><Step number={4} text="Track all transactions easily" /></FadeUp>
        </div>
      </motion.section>

      {/* Security Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 text-center w-full px-4 md:px-20 relative z-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold">Secure & Reliable</h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
          Your transactions are protected with top-notch security and authorization.
        </p>
        <Link 
          href="/auth" 
          className="mt-6 inline-flex items-center gap-2 bg-[#12478C] text-white px-6 py-3 rounded-xl hover:bg-[#0f3569] transition text-sm sm:text-base"
        >
          Create Your Account on PayLock
          <GoArrowRight size={20} />
        </Link>
      </motion.section>
    </main>
  );
}

/* MiniFeature */
function MiniFeature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <motion.div whileHover={{ scale: 1.1, rotate: 2 }} className="flex flex-col items-center gap-2 min-w-[100px] sm:min-w-[150px]">
      {icon}
      <p className="mt-2 text-gray-700 font-semibold text-sm sm:text-base">{title}</p>
    </motion.div>
  );
}

/* FeatureCard */
function FeatureCard({ Icon, title, description }: { Icon: React.ElementType; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: -1 }}
      className="p-6 border rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center gap-4 bg-white/70 backdrop-blur-md border-gray-200 max-w-xs sm:max-w-sm min-h-[200px]"
    >
      <Icon className="text-2xl sm:text-3xl text-[#12478C]" />
      <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 text-xs sm:text-sm">{description}</p>
    </motion.div>
  );
}

/* Step */
function Step({ number, text }: { number: number; text: string }) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center gap-2 min-w-[100px] sm:min-w-[150px] text-center">
      <div className="bg-[#12478C] text-white w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full font-bold text-sm sm:text-base">
        {number}
      </div>
      <p className="mt-2 text-gray-700 text-xs sm:text-sm md:text-base">{text}</p>
    </motion.div>
  );
}

/* FadeUp Animation Wrapper */
function FadeUp({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
      {children}
    </motion.div>
  );
}
