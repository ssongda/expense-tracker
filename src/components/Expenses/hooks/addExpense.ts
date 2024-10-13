import { Expense } from "@/domain/model/expense";
import getSession from "@/lib/session";

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
      throw new Error('支出の追加が失敗しました。');
    }

    await refetchExpenses();
  } catch (err) {

    alert('支出の追加の際にエラーが発生しました。');
  }
};