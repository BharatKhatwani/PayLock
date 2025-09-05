import { Card } from "@repo/ui/card";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card title={"Balance"}>
      <div className="space-y-3">
        {/* Unlocked Balance */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 border-b border-slate-300 pb-2">
          <span className="text-sm sm:text-base font-medium">Unlocked Balance</span>
          <span className="text-sm sm:text-base">{amount / 100} INR</span>
        </div>

        {/* Locked Balance */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 border-b border-slate-300 pb-2">
          <span className="text-sm sm:text-base font-medium">Total Locked Balance</span>
          <span className="text-sm sm:text-base">{locked / 100} INR</span>
        </div>

        {/* Total Balance */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
          <span className="text-sm sm:text-base font-medium">Total Balance</span>
          <span className="text-sm sm:text-base">
            {(locked + amount) / 100} INR
          </span>
        </div>
      </div>
    </Card>
  );
};
