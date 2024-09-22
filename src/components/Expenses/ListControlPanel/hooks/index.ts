import { Expense } from "@/domain/model/expense";
import { useCallback } from "react";

type Args = {
  selectedExpenses: Set<number>;
  onSelectExpenses: (ids: Set<number>) => void;
  expenseData: Expense[];
}

export const useListControlPanel = ({ selectedExpenses, onSelectExpenses, expenseData }: Args) => {

  const toggleAllExpenses = useCallback(() => {
    if (selectedExpenses.size === expenseData.length) {
      onSelectExpenses(new Set());
    } else {
      onSelectExpenses(new Set(expenseData.map(e => e.id!)));
    }
  }, [selectedExpenses]);

  return {
    toggleAllExpenses
  }
}