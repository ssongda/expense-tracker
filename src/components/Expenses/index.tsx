import { Expense } from '@/domain/model/expense';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Suspense } from 'react';
import { ExpenseInput } from './ExpenseInput';
import { ExpenseItem } from './ExpenseItem';
import { ExpenseTotal } from './ExpenseTotal';
import { useExpenseList } from './hooks';
import styles from './index.module.css';
import { ListControlPanel } from './ListControlPanel';

const ExpenseList = ({
  selectedDate,
}: {
  selectedDate: Date;
}): JSX.Element => {
  const {
    selectedExpenses,
    expenseData,
    totalAmount,
    refetchExpenses,
    handleSelectExpenses,
    deleteSelectedExpenses,
  } = useExpenseList({
    selectedDate,
  });

  return (
    <div className={styles.expenseList}>
      <h2>
        {format(selectedDate, 'yyyy/MM/dd', {
          locale: ko,
        })}
      </h2>

      <ExpenseInput
        selectedDate={selectedDate}
        refetchExpenses={refetchExpenses}
      />

      <ExpenseTotal totalAmount={totalAmount} />

      <ListControlPanel
        selectedExpenses={selectedExpenses}
        onSelectExpenses={handleSelectExpenses}
        expenseData={expenseData}
        deleteSelectedExpenses={
          deleteSelectedExpenses
        }
      />
      {Array.isArray(expenseData) &&
      expenseData.length > 0 ? (
        <>
          <table className={styles.expenseTable}>
            <colgroup>
              <col
                className={styles.checkboxColumn}
              />
              <col
                className={styles.categoryColumn}
              />
              <col
                className={styles.amountColumn}
              />
            </colgroup>
            <tbody>
              <Suspense
                fallback={<div>Loading...</div>}
              >
                {expenseData.map(
                  (expense: Expense) => (
                    <ExpenseItem
                      key={expense.id}
                      expense={expense}
                      selectedExpenses={
                        selectedExpenses
                      }
                      onSelectExpenses={
                        handleSelectExpenses
                      }
                    />
                  ),
                )}
              </Suspense>
            </tbody>
          </table>
        </>
      ) : (
        <div>내역이 없습니다.</div>
      )}
    </div>
  );
};

export default ExpenseList;
