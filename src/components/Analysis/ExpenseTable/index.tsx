'use client';

import styles from './index.module.css';

type ExpenseTableProps = {
    currentAmounts: number[];
    percentages: number[];
};

const ExpenseTable = ({ currentAmounts, percentages }: ExpenseTableProps): JSX.Element => {
    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>タイプ</th>
                        <th>金額</th>
                        <th>割合</th>
                    </tr>
                </thead>
                <tbody>
                    {percentages.map((percentage, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{index === 0 ? "食費" : index === 1 ? "交通費" : index === 2 ? "レーザー" : "その他"}</td>
                            <td>{currentAmounts[index]}</td>
                            <td>{percentage.toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default ExpenseTable;
