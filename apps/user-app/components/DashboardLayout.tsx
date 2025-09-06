"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SidebarItem } from "../components/SidebarItem";
import { HiHome, HiArrowRight, HiOutlineSwitchHorizontal } from "react-icons/hi";
import { GoArrowUpRight } from "react-icons/go";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main content */}
      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
<div
  className={`
    fixed md:static z-40 top-0 left-0 h-full md:h-auto w-72 bg-white border-r border-slate-300
    transform transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    pt-20
  `}
>

          <div className="p-4 space-y-4">
            <SidebarItem href="/dashboard" icon={<HiHome size={24} />} title="Home" />
            <SidebarItem href="/transfer" icon={<HiArrowRight size={24} />} title="Transfer" />
            <SidebarItem href="/transactions" icon={<HiOutlineSwitchHorizontal size={24} />} title="Transactions" />
            <SidebarItem href="/p2p" icon={<GoArrowUpRight size={24} />} title="P2P Transfer" />
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Page content */}
        <div className="flex-1 p-6 ">{children}</div>
      </div>

      <Footer />
    </div>
  );
}