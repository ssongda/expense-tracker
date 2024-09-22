import React, { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import styles from "./index.module.css";
import { Button } from "../common/Button";
import { formatNumber, unformatNumber } from "@/utils/common/formatNumber";
import { Expense, useExpenseList } from "./hooks";

const DEFAULT_EXPENSE_TYPES = ["식비", "교통비", "오락", "공과금"];

const ExpenseList = ({ selectedDate }: { selectedDate: Date }): JSX.Element => {
  const { expenseData, refetchExpenses } = useExpenseList({
    formattedDate: format(selectedDate, "yyyyMMdd"),
  });

  const [newExpense, setNewExpense] = useState({
    type: DEFAULT_EXPENSE_TYPES[0],
    amount: "",
  });

  const addExpense = async (expense: Omit<Expense, "id">) => {
    try {
      const formattedDate = format(selectedDate, "yyyyMMdd");
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...expense,
          amount: expense.amount,
          category: expense.category,
          date: formattedDate,
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
        }),
      });
      if (!response.ok) {
        throw new Error("지출의 추가에 실패했습니다.");
      }
      await refetchExpenses();
    } catch (err) {
      console.error(err);
      alert("지출의 추가중 오류가 발생했습니다.");
    }
  };

  const deleteExpense = async (id: number) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("지출을 삭제하는데 실패했습니다.");
      }

      await refetchExpenses();
    } catch (err) {
      console.error(err);
      alert("지출을 삭제하는 중 오류가 발생했습니다.");
    }
  };

  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const type: string = (form.elements.namedItem("type") as HTMLSelectElement)
      .value;
    const amount: string = (
      form.elements.namedItem("amount") as HTMLInputElement
    ).value;

    if (!type && !amount) {
      return;
    }

    if (type && amount) {
      addExpense({
        category: type,
        amount: unformatNumber(amount),
      });
    }
  };

  return (
    <div className={styles.expenseList}>
      <h2>{format(selectedDate, "yyyy/MM/dd", { locale: ko })}</h2>

      {/* <h3>총 지출액: ₩{totalExpense.toLocaleString()}</h3> */}
      <form className={styles.inputContainer} onSubmit={handleAddExpense}>
        <select
          value={newExpense.type}
          onChange={(e) =>
            setNewExpense({ ...newExpense, type: e.target.value })
          }
        >
          {DEFAULT_EXPENSE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="금액"
          value={newExpense.amount}
          onChange={(e) =>
            setNewExpense({
              ...newExpense,
              amount: formatNumber(e.target.value),
            })
          }
        />
        <button type="submit">추가</button>
      </form>
      {Array.isArray(expenseData) && expenseData.length > 0 ? (
        <ul className={styles.expenseItems}>
          {expenseData.map((expense: Expense) => (
            <li key={expense.id} className={styles.expenseItem}>
              <span>{expense.category}</span>
              <span className={styles.expenseAmount}>
                ₩{expense.amount.toLocaleString()}
              </span>
              <Button onClick={() => deleteExpense(expense.id)}>삭제</Button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default ExpenseList;
