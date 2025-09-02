"use client";
import React from "react";
import { SidebarItem } from "../../components/SiderBarItem";
import { HiHome, HiArrowRight, HiOutlineSwitchHorizontal } from "react-icons/hi";
import Navbar from "../../components/Navbar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Main content with top padding to account for fixed navbar */}
      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <div className="w-72 border-r border-slate-300 min-h-full bg-white">
          <div className="p-4 space-y-2">
            <SidebarItem 
              href="/dashboard" 
              icon={<HiHome size={24} />} 
              title="Home" 
            />
            <SidebarItem 
              href="/transfer" 
              icon={<HiArrowRight size={24} />} 
              title="Transfer" 
            />
            <SidebarItem 
              href="/transactions" 
              icon={<HiOutlineSwitchHorizontal size={24} />} 
              title="Transactions" 
            />
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-6 bg-gray-50">{children}</div>
      </div>
    </div>
  );
}