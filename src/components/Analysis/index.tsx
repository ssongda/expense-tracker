'use client';

import { CalendarHeader } from "@/components/Calendar/CalendarHeader";
import { useState } from "react";
import { format } from "date-fns";
import YearSelector from "../YearSelector";
import styles from './index.module.css';
import { ko } from "date-fns/locale";
import CircleChart from "./CircleChart";
import ExpenseTable from './ExpenseTable';

const Analysis = (): JSX.Element => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const totalAmount = 1000;
    const currentAmounts = [700, 200, 95, 5];
    const percentages = currentAmounts.map(amount => (amount / totalAmount) * 100);

    const averageAmount = (totalAmount / 30).toFixed(2);

    return (
        <div className={styles.analysisContainer}>
            <div className={styles.analysis}>
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
                    currentDate={currentDate}
                    setCurrentDate={setCurrentDate}
                />

                <table className={styles.col}>
                    <thead>
                        <tr>
                            <th>月</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><CircleChart percentages={percentages} /></td>
                        </tr>
                        <tr>
                            <td>支出計: {totalAmount}</td>
                        </tr>
                        <tr>
                            <td>一日平均: {averageAmount}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <ExpenseTable currentAmounts={currentAmounts} percentages={percentages} />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Analysis;