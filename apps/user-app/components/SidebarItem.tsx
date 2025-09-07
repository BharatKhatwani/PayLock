"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ href, title, icon }) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <div
      className={`
        flex items-center gap-3 p-3 pl-6 rounded-l-lg
        cursor-pointer transition-colors duration-200
        ${selected ? "bg-[#f0ebff] text-[#6a51a6] font-semibold" : "text-slate-500 hover:bg-slate-100 hover:text-[#6a51a6]"}
      `}
      onClick={() => router.push(href)}
    >

        {/* <h1>PayLock</h1>  brand / icons  */}
      <div className="text-xl">{icon}</div>
      <span className="text-md">{title}</span>
    </div>
  );
};
