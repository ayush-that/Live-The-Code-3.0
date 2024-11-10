import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  console.log(totalBudget, totalIncome, totalSpend);
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `
      Based on the following financial data:
      - The total buget I have prepared is ${totalBudget} INR 
      - Out of this allocated budget I have spent ${totalSpend} INR 
      - My total income is ${totalIncome} INR
      Provide me financial advice in 4 sentences to help me manage my finances more effectively in Indian context.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const advice = response.text();

    console.log(advice);
    return advice;
  } catch (error) {
    console.error('Error fetching financial advice:', error);
    return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
  }
};

export default getFinancialAdvice;
