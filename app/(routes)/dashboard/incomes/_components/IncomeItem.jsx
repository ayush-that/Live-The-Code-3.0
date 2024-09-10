import React from 'react';
import { db } from '@/utils/dbConfig';
import { Incomes } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';

function IncomeItem({ budget, refreshData }) {
  const calculateProgressPerc = () => {
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  const deleteIncome = async () => {
    const result = await db
      .delete(Incomes)
      .where(eq(Incomes.id, budget.id))
      .returning();

    if (result) {
      toast('Income Deleted!');
      refreshData();
    }
  };

  return (
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
        <Trash className="cursor-pointer text-red-500" onClick={deleteIncome} />
      </div>
    </div>
  );
}

export default IncomeItem;
