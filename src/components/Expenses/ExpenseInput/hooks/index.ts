import { formatNumber } from "@/utils/common/formatNumber";
import { useCallback, useMemo, useRef } from "react";
import { addExpense } from "../../hooks/addExpense";
import { format } from "date-fns";

type Args = {
  selectedDate: Date;
  refetchExpenses: () => Promise<void>;
}

type ReturnValue = {
  categoryRef: React.RefObject<HTMLSelectElement>;
  amountRef: React.RefObject<HTMLInputElement>;
  handleAddExpense: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: () => void;
}

export const useExpenseInput = ({ selectedDate, refetchExpenses }: Args): ReturnValue => {
  const categoryRef = useRef<HTMLSelectElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const formattedDate = useMemo(() => format(selectedDate || new Date(), 'yyyyMMdd'), [selectedDate])


  const handleInputChange = useCallback(() => {
    const input = amountRef.current;
    const formattedValue = formatNumber(input?.value || '');

    if (!input) return;

    input.value = formattedValue;
    const caretPosition = input.selectionStart;
    input.value = formattedValue;

    input.setSelectionRange(caretPosition, caretPosition);
  }, [amountRef.current?.value]);

  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const category = categoryRef.current?.value || '식비';
    const amount = amountRef.current?.value || '';

    if (!category || !amount) {
      return;
    }

    addExpense({
      category,
      amount,
      date: formattedDate,
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1,
      refetchExpenses
    });

    if (categoryRef.current) {
      categoryRef.current.value = "식비";
    }
    if (amountRef.current) {
      amountRef.current.value = '';
    }
  };

  return {
    categoryRef,
    amountRef,
    handleAddExpense,
    handleInputChange
  }
};
