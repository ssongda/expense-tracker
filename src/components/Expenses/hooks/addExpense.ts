import { Expense } from "@/domain/model/expense";

type Args = {
  category: string;
  amount: string;
  date: string;
  year: number;
  month: number;
  refetchExpenses: () => Promise<void>;
}

export const addExpense = async ({ category, amount, date, year, month, refetchExpenses }: Args) => {
  try {
    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        category,
        date,
        year,
        month,
      }),
    });

    if (!response.ok) {
      throw new Error('지출의 추가에 실패했습니다.');
    }

    await refetchExpenses();
  } catch (err) {

    alert('지출의 추가중 오류가 발생했습니다.');
  }
};