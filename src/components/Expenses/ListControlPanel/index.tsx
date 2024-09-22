import { Button } from '@/components/common/Button';
import { Expense } from '@/domain/model/expense';
import { CheckSquare, MinusSquare, Square, Trash2 } from 'react-feather';
import { useListControlPanel } from './hooks';
import styles from './index.module.css';

type Props = {
  selectedExpenses: Set<number>;
  expenseData: Expense[];
  onSelectExpenses: (idSet: Set<number>) => void;
  deleteSelectedExpenses: () => Promise<void>;
};

export const ListControlPanel = ({
  selectedExpenses,
  onSelectExpenses,
  expenseData,
  deleteSelectedExpenses,
}: Props) => {
  const { toggleAllExpenses } = useListControlPanel({
    selectedExpenses,
    onSelectExpenses,
    expenseData,
  });

  return (
    <div className={styles.controlPanel}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={selectedExpenses.size === expenseData.length}
          onChange={toggleAllExpenses}
          className={styles.hiddenCheckbox}
        />
        <>
          {selectedExpenses.size === expenseData.length ? (
            <CheckSquare />
          ) : selectedExpenses.size === 0 ? (
            <Square />
          ) : (
            <MinusSquare />
          )}
        </>
      </label>
      <Button onClick={deleteSelectedExpenses}>
        <span className={styles.deleteIcon}>
          <Trash2 />
        </span>
      </Button>
    </div>
  );
};
