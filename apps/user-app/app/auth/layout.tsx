// app/(auth)/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth"; // adjust path

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    // Already logged in → redirect to dashboard
    redirect("/dashboard");
  }

  return <>{children}</>;
}
