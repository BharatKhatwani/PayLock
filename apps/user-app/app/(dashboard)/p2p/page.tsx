import { SendCard } from "../../../components/SendCard";

export default async function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-0">
      
      {/* Header */}
      <h1 className="text-3xl font-bold text-center m-0">
        <span className="text-purple-500">PayLoad</span> P2P Transfer
      </h1>
      
      <p className="text-center text-gray-600 mt-2">
        Fast and safe P2P transfers
      </p>

      {/* Card */}
      <div className="w-full max-w-md mt-0">
        <SendCard />
      </div>
    </div>
  );
}
