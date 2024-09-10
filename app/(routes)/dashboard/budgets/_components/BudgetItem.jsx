import Link from 'next/link';
import React from 'react';

function BudgetItem({ budget }) {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };
  return (
    <Link href={'/dashboard/expenses/' + budget?.id}>
      <div className="h-[170px] cursor-pointer rounded-2xl border p-5 hover:shadow-md">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="rounded-full bg-slate-100 p-3 px-4 text-2xl">
              {budget?.icon}
            </h2>
            <div>
              <h2 className="font-bold">{budget.name}</h2>
              <h2 className="text-sm text-gray-500">{budget.totalItem} Item</h2>
            </div>
          </div>
          <h2 className="text-lg font-bold text-primary"> ${budget.amount}</h2>
        </div>

        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs text-slate-400">
              ${budget.totalSpend ? budget.totalSpend : 0} Spend
            </h2>
            <h2 className="text-xs text-slate-400">
              ${budget.amount - budget.totalSpend} Remaining
            </h2>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-300">
            <div
              className="h-2 rounded-full bg-primary"
              style={{
                width: `${calculateProgressPerc()}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
