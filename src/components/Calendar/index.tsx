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

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);

  const startDate = startOfWeek(monthStart);

  const dateFormat = "d";
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = "";

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      formattedDate = format(day, dateFormat);
      days.push(
        <div
          className={`${styles.col} ${styles.cell} ${
            !isSameMonth(day, monthStart)
              ? styles.disabled
              : isSameDay(day, new Date())
              ? styles.selected
              : ""
          }`}
          key={day.toString()}
        >
          <span className={styles.number}>{formattedDate}</span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className={styles.row} key={day?.toString()}>
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
    </div>
  );
};

export default Calendar;
