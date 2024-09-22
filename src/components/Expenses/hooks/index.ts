import { useEffect, useState, useCallback } from "react";

export type Expense = {
  id: number;
  category: string;
  amount: number;
};


type Args = { formattedDate: string }

type ReturnValue = {
  expenseData: Expense[];
  refetchExpenses: () => Promise<void>;
}

export const useExpenseList = ({ formattedDate }: Args): ReturnValue => {
  const [expenseData, setExpenseData] = useState<Expense[]>([]);  // 初期値を空配列に

  const fetchExpenseList = useCallback(async () => {
    try {
      const response = await fetch(`/api/expenses?date=${formattedDate}`);
      if (!response.ok) {
        throw new Error("failed to fetch expenses");
      }
      const data = await response.json();
      setExpenseData(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setExpenseData([]);
    }
  }, [formattedDate]);


  useEffect(() => {
    fetchExpenseList();
  }, [fetchExpenseList]);

  return { expenseData, refetchExpenses: fetchExpenseList };
}
