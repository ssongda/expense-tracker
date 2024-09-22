import { Expense } from '@/domain/model/expense';
import { format } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { deleteExpenses } from './deleteExpenses';

type Args = { selectedDate: Date };

type ReturnValue = {
  selectedExpenses: Set<number>;
  expenseData: Expense[];
  formattedDate: string;
  totalAmount: string;
  handleSelectExpenses: (idSet: Set<number>) => void,
  refetchExpenses: () => Promise<void>;
  deleteSelectedExpenses: () => Promise<void>;
};

export const useExpenseList = ({ selectedDate }: Args): ReturnValue => {
  const [expenseData, setExpenseData] = useState<Expense[]>([]);
  const [selectedExpenses, setSelectedExpenses] = useState<Set<number>>(
    new Set(),
  );

  const formattedDate = useMemo(
    () => format(selectedDate, 'yyyyMMdd'),
    [selectedDate],
  );

  const fetchExpenseList = useCallback(async () => {
    try {
      const response = await fetch(`/api/expenses?date=${formattedDate}`);
      if (!response.ok) {
        throw new Error('failed to fetch expenses');
      }
      const data = await response.json();
      setExpenseData(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setExpenseData([]);
    }
  }, [formattedDate]);

  const deleteSelectedExpenses = async () => {
    await deleteExpenses({
      ids: Array.from(selectedExpenses),
      refetchExpenses: fetchExpenseList,
    });

    setSelectedExpenses(new Set());
  };

  const handleSelectExpenses = useCallback((idSet: Set<number>) => {
    setSelectedExpenses(idSet)
  }, [])


  const totalAmount = useMemo(() => {
    const total = expenseData.reduce((acc, expense) => acc + parseInt(expense.amount), 0);
    return total.toString();
  }, [expenseData]);

  useEffect(() => {
    fetchExpenseList();
  }, [fetchExpenseList]);

  return {
    selectedExpenses,
    expenseData,
    formattedDate,
    totalAmount,
    handleSelectExpenses,
    refetchExpenses: fetchExpenseList,
    deleteSelectedExpenses,
  };
};
