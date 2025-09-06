import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";
import DashboardLayoutClient from "../../components/DashboardLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Server-side session check
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/home"); // Redirect if not logged in
  }

  // ✅ Pass user or session into client layout if needed
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
