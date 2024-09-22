"use client";

import React, { useState } from "react";
import {
  startOfMonth,
  startOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { ko } from "date-fns/locale";
import YearSelector from "../YearSelector";
import styles from "./index.module.css";
import { CalendarHeader } from "./CalendarHeader";
import ExpenseList from "../Expenses";

interface Expense {
  id: number;
  type: string;
  amount: number;
}

interface ExpensesByDate {
  [date: string]: Expense[];
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expensesByDate, setExpensesByDate] = useState<ExpensesByDate>({});

  const getTotalExpenseForDate = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    const expenses = expensesByDate[dateString] || [];
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
    // 여기에서 ExpenseList 컴포넌트의 데이터를 업데이트하는 로직 추가
    fetchExpensesForDate(day);
  };

  const fetchExpensesForDate = async (date: Date) => {
    try {
      const formattedDate = format(date, "yyyyMMdd");
      const response = await fetch(`/api/expenses?date=${formattedDate}`);
      if (!response.ok) {
        throw new Error("데이터 取得に失敗しました。");
      }
      const data = await response.json();
      setExpensesByDate((prev) => ({
        ...prev,
        [formattedDate]: data,
      }));
    } catch (err) {
      console.error("데이터 取得中にエラーが発生しました。", err);
    }
  };

  const addExpense = (expense: Omit<Expense, "id">) => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const newExpense = { ...expense, id: Date.now() };
    setExpensesByDate((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newExpense],
    }));
  };

  const deleteExpense = (id: number) => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    setExpensesByDate((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((expense) => expense.id !== id),
    }));
  };

  const monthStart = startOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);

  const rows = [];
  let days = [];
  let day = startDate;

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const cloneDay = new Date(day);
      const totalExpense = getTotalExpenseForDate(cloneDay);
      days.push(
        <div
          className={`${styles.col} ${styles.cell} ${
            !isSameMonth(day, monthStart)
              ? styles.disabled
              : isSameDay(day, selectedDate)
              ? styles.selected
              : ""
          }`}
          key={day.toString()}
          onClick={() => onDateClick(cloneDay)}
        >
          <span className={styles.number}>{format(day, "d")}</span>
          {totalExpense > 0 && (
            <span className={styles.expense}>
              {totalExpense.toLocaleString()}원
            </span>
          )}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className={styles.row} key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendar}>
        <header className={styles.header}>
          <div className={styles.monthDisplay}>
            <span className={styles.year}>
              {format(currentDate, "yyyy", { locale: ko })}
            </span>
            <span className={styles.month}>
              {format(currentDate, "M", { locale: ko })}
            </span>
          </div>
        </header>
        <YearSelector
          currentYear={currentDate.getFullYear()}
          onYearChange={(year) =>
            setCurrentDate(new Date(year, currentDate.getMonth(), 1))
          }
        />
        <CalendarHeader
          setCurrentDate={setCurrentDate}
          currentDate={currentDate}
        />

        <div className={styles.days}>
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div className={styles.col} key={day}>
              {day}
            </div>
          ))}
        </div>
        <div className={styles.body}>{rows}</div>
      </div>
      <ExpenseList
        selectedDate={selectedDate}
        // expenses={expensesByDate[format(selectedDate, "yyyyMMdd")] || []}
        // addExpense={addExpense}
        // deleteExpense={deleteExpense}
      />
    </div>
  );
};

export default Calendar;
