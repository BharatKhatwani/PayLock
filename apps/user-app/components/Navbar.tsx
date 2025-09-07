"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { IoMenuSharp } from "react-icons/io5";
import Link from "next/link";

export default function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
      {/* Brand / Logo */}
      <div className="flex items-center gap-4">
        {/* Sidebar toggle button (only on mobile) */}
        <button
          className="md:hidden text-2xl text-[#12478C]"
          onClick={onToggleSidebar}
        >
          <IoMenuSharp />
        </button>

        <Link
          href="/dashboard"
          className="text-2xl font-bold text-[#12478C] cursor-pointer"
        >
          PayLock
        </Link>
      </div>

      {/* Actions */}
      <div>
        <button
          onClick={() => signOut({ callbackUrl: "/home" })}
          className="px-4 py-2 bg-[#12478C] text-white rounded hover:bg-[#12478C] transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
