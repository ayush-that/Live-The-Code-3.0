'use client';
import React, { useEffect, useState } from 'react';
import CreateIncomes from './CreateIncomes';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Incomes, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import IncomeItem from './IncomeItem';

function IncomeList() {
  const [incomelist, setIncomelist] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getIncomelist();
  }, [user]);

  const getIncomelist = async () => {
    const result = await db
      .select({
        ...getTableColumns(Incomes),
        totalSpend: sql`sum(CAST(${Expenses.amount} AS DECIMAL))`.mapWith(
          Number
        ),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Incomes)
      .leftJoin(Expenses, eq(Incomes.id, Expenses.budgetId))
      .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Incomes.id)
      .orderBy(desc(Incomes.id));
    setIncomelist(result);
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <CreateIncomes refreshData={() => getIncomelist()} />
        {incomelist?.length > 0
          ? incomelist.map((budget, index) => (
              <IncomeItem
                budget={budget}
                key={index}
                refreshData={() => getIncomelist()}
              />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="h-[150px] w-full animate-pulse rounded-lg bg-slate-200"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default IncomeList;