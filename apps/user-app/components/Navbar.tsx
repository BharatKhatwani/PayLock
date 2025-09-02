"use client";

import React from "react";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
      {/* Brand / Logo */}
      <h1 className="text-2xl font-bold text-purple-700">PayLoad</h1>
      
      {/* Actions */}
      <div>
        <button
          onClick={() => signOut({ callbackUrl: "/auth/sign" })} // redirects after logout
          className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
