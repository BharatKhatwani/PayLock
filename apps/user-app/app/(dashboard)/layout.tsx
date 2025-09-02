// app/(dashboard)/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";
import Navbar from "../../components/Navbar";
import { SidebarItem } from "../../components/SiderBarItem";
import { HiHome, HiArrowRight, HiOutlineSwitchHorizontal } from "react-icons/hi";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side session check
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth"); // Redirect to login if not authenticated
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Main content with top padding for fixed navbar */}
      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <div className="w-72 border-r border-slate-300 min-h-full bg-white">
          <div className="p-4 space-y-2">
            <SidebarItem href="/dashboard" icon={<HiHome size={24} />} title="Home" />
            <SidebarItem href="/transfer" icon={<HiArrowRight size={24} />} title="Transfer" />
            <SidebarItem href="/transactions" icon={<HiOutlineSwitchHorizontal size={24} />} title="Transactions" />
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-6 bg-gray-50">{children}</div>
      </div>
    </div>
  );
}
