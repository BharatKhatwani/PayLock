// app/(dashboard)/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";
import Navbar from "../../components/Navbar";
import { SidebarItem } from "../../components/SidebarItem";
import { HiHome, HiArrowRight, HiOutlineSwitchHorizontal } from "react-icons/hi";
import { GoArrowUpRight } from "react-icons/go";
import Footer from "../../components/Footer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Server-side session check
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth"); // Redirect if not logged in
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <div className="w-72 border-r border-slate-300 min-h-full bg-white">
          <div className="p-4 space-y-2">
            <SidebarItem href="/dashboard" icon={<HiHome size={24} />} title="Home" />
            <SidebarItem href="/transfer" icon={<HiArrowRight size={24} />} title="Transfer" />
            <SidebarItem href="/transactions" icon={<HiOutlineSwitchHorizontal size={24} />} title="Transactions" />
            <SidebarItem href="/p2p" icon={<GoArrowUpRight size={24} />} title="P2P Transfer" />
          </div>
        </div>

        {/* Page content */}
       <div
  className="flex-1 p-6"

>
  {children}
</div>

       
      </div>
       <Footer/>
    </div>
  );
}
