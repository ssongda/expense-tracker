'use client';

import {
  addDays,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import React, { useState } from 'react';
import ExpenseList from '../Expenses';
import { Label } from '../Label';
import YearSelector from '../YearSelector';
import { CalendarHeader } from './CalendarHeader';
import styles from './index.module.css';

interface Expense {
  id: number;
  type: string;
  amount: number;
}

interface ExpensesByDate {
  [date: string]: Expense[];
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(
    new Date(),
  );
  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const monthStart = startOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);

  const rows = [];
  let days = [];
  let day = startDate;

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const cloneDay = new Date(day);
      const isToday = isSameDay(
        cloneDay,
        new Date(),
      );
      days.push(
        <div
          className={`${styles.col} ${styles.cell} ${
            !isSameMonth(day, monthStart)
              ? styles.disabled
              : isSameDay(day, selectedDate)
                ? styles.selected
                : ''
          }`}
          key={day.toString()}
          onClick={() => onDateClick(cloneDay)}
        >
          <span className={styles.number}>
            {format(day, 'd')}
            {isToday && (
              <span
                className={styles.todayBadge}
              ></span>
            )}
          </span>
          {isToday && (
            <div className={styles.todayLabel}>
              <Label>Today</Label>
            </div>
          )}
        </div>,
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div
        className={styles.row}
        key={day.toString()}
      >
        {days}
      </div>,
    );
    days = [];
  }

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendar}>
        <header className={styles.header}>
          <div className={styles.monthDisplay}>
            <span className={styles.year}>
              {format(currentDate, 'yyyy', {
                locale: ko,
              })}
            </span>
            <span className={styles.month}>
              {format(currentDate, 'M', {
                locale: ko,
              })}
            </span>
          </div>
        </header>
        <YearSelector
          currentYear={currentDate.getFullYear()}
          onYearChange={year =>
            setCurrentDate(
              new Date(
                year,
                currentDate.getMonth(),
                1,
              ),
            )
          }
        />
        <CalendarHeader
          setCurrentDate={setCurrentDate}
          currentDate={currentDate}
        />

        <div className={styles.days}>
          {[
            '일',
            '월',
            '화',
            '수',
            '목',
            '금',
            '토',
          ].map(day => (
            <div className={styles.col} key={day}>
              {day}
            </div>
          ))}
        </div>
        <div className={styles.body}>{rows}</div>
      </div>
      <ExpenseList selectedDate={selectedDate} />
    </div>
  );
};

export default Calendar;
