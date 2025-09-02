// app/user/page.tsx
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth"; // adjust path

export default async function UserPage() {
  // Get session from cookies (server-side)
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    // Not logged in → redirect to login
    redirect("/auth");
  }

  // Logged in → redirect to dashboard
  redirect("/user/dashboard");

  return null; // never renders
}
