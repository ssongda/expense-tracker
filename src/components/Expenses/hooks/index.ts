import { Expense } from "@/domain/model/expense";
import { format } from "date-fns";
import { useEffect, useState, useCallback, useMemo } from "react";


type Args = { selectedDate: Date }

type ReturnValue = {
  newExpense: Pick<Expense, "category" | "amount">;
  expenseData: Expense[];
  formattedDate: string;
  refetchExpenses: () => Promise<void>;
  setNewExpense: (expense: Pick<Expense, "category" | "amount">) => void;
}

export const useExpenseList = ({ selectedDate }: Args): ReturnValue => {
  const [expenseData, setExpenseData] = useState<Expense[]>([]);

  const [newExpense, setNewExpense] = useState<Pick<Expense, "category" | "amount">>({
    category: "식비",
    amount: "",
  });

  const formattedDate = useMemo(() => format(selectedDate, 'yyyyMMdd'), [selectedDate])

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

  return { expenseData, newExpense, formattedDate, setNewExpense, refetchExpenses: fetchExpenseList };
}
