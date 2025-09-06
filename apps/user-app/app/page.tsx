// app/user/page.tsx
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth"; // correct path

export default async function UserPage() {
  // Pass cookies automatically in App Router
  const session = await getServerSession(authOptions);
console.log(session)
  if (session?.user) {
    // User is already logged in → go to dashboard
    redirect("/dashboard");
  }

  // Not logged in → show login page
  redirect("/home");

  return null; // never renders
}
