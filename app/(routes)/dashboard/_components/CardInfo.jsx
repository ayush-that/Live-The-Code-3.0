import formatNumber from '@/utils';
import getFinancialAdvice from '@/utils/getFinancialAdvice';
import {
  PiggyBank,
  ReceiptText,
  Wallet,
  Sparkles,
  CircleDollarSign,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

function CardInfo({ budgetList, incomeList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [financialAdvice, setFinancialAdvice] = useState('');

  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      CalculateCardInfo();
    }
  }, [budgetList, incomeList]);

  useEffect(() => {
    if (totalBudget > 0 || totalIncome > 0 || totalSpend > 0) {
      const fetchFinancialAdvice = async () => {
        const advice = await getFinancialAdvice(
          totalBudget,
          totalIncome,
          totalSpend
        );
        setFinancialAdvice(advice);
      };

      fetchFinancialAdvice();
    }
  }, [totalBudget, totalIncome, totalSpend]);

  const CalculateCardInfo = () => {
    console.log(budgetList);
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    let totalIncome_ = 0;

    budgetList.forEach((element) => {
      totalBudget_ = totalBudget_ + Number(element.amount);
      totalSpend_ = totalSpend_ + element.totalSpend;
    });

    incomeList.forEach((element) => {
      totalIncome_ = totalIncome_ + element.totalAmount;
    });

    setTotalIncome(totalIncome_);
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div>
          <div className="-mb-1 mt-4 flex items-center justify-between rounded-2xl border p-7">
            <div className="">
              <div className="mb-2 flex flex-row items-center space-x-1">
                <h2 className="text-md">Koober AI</h2>
                <Sparkles className="background-animate h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-2 text-white" />
              </div>
              <h2 className="text-md font-light">
                {financialAdvice || 'Loading financial advice...'}
              </h2>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center justify-between rounded-2xl border p-7">
              <div>
                <h2 className="text-sm">Total Budget</h2>
                <h2 className="text-2xl font-bold">
                  ${formatNumber(totalBudget)}
                </h2>
              </div>
              <PiggyBank className="h-12 w-12 rounded-full bg-blue-800 p-3 text-white" />
            </div>
            <div className="flex items-center justify-between rounded-2xl border p-7">
              <div>
                <h2 className="text-sm">Total Spend</h2>
                <h2 className="text-2xl font-bold">
                  ${formatNumber(totalSpend)}
                </h2>
              </div>
              <ReceiptText className="h-12 w-12 rounded-full bg-blue-800 p-3 text-white" />
            </div>
            <div className="flex items-center justify-between rounded-2xl border p-7">
              <div>
                <h2 className="text-sm">No. Of Budget</h2>
                <h2 className="text-2xl font-bold">{budgetList?.length}</h2>
              </div>
              <Wallet className="h-12 w-12 rounded-full bg-blue-800 p-3 text-white" />
            </div>
            <div className="flex items-center justify-between rounded-2xl border p-7">
              <div>
                <h2 className="text-sm">Sum of Income Streams</h2>
                <h2 className="text-2xl font-bold">
                  ${formatNumber(totalIncome)}
                </h2>
              </div>
              <CircleDollarSign className="h-12 w-12 rounded-full bg-blue-800 p-3 text-white" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item, index) => (
            <div
              className="h-[110px] w-full animate-pulse rounded-lg bg-slate-200"
              key={index}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
