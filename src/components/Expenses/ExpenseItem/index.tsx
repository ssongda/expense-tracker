import { Expense } from '@/domain/model/expense';
import {
  CheckSquare,
  Square,
} from 'react-feather';
import styles from './index.module.css';

type Props = {
  expense: Expense;
  selectedExpenses: Set<number>;
  onSelectExpenses: (idSet: Set<number>) => void;
};

export const ExpenseItem = ({
  expense,
  selectedExpenses,
  onSelectExpenses,
}: Props): JSX.Element => {
  const toggleExpenseSelection = (id: number) => {
    const newSet: Set<number> = new Set(
      selectedExpenses,
    );
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }

    onSelectExpenses(newSet);
  };

  return (
    <tr key={expense.id}>
      <td className={styles.tableCell}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={selectedExpenses.has(
              expense.id!,
            )}
            onChange={() =>
              toggleExpenseSelection(expense.id!)
            }
            className={styles.hiddenCheckbox}
          />
          <span className={styles.customCheckbox}>
            {selectedExpenses.has(expense.id!) ? (
              <CheckSquare />
            ) : (
              <Square />
            )}
          </span>
        </label>
      </td>
      <td className={styles.tableCell}>
        {expense.category}
      </td>
      <td className={styles.amountWrapper}>
        <span>
          {expense.amount.toLocaleString()}
        </span>
      </td>
    </tr>
  );
};
