import { Button } from '@/components/common/Button';
import { PlusCircle } from 'react-feather';
import { useExpenseInput } from './hooks';
import styles from './index.module.css';

const DEFAULT_EXPENSE_TYPES = [
  '식비',
  '교통비',
  '오락',
  '공과금',
];

type Props = {
  selectedDate: Date;
  refetchExpenses: () => Promise<void>;
};

export const ExpenseInput = ({
  selectedDate,
  refetchExpenses,
}: Props) => {
  const {
    categoryRef,
    amountRef,
    handleAddExpense,
    handleInputChange,
  } = useExpenseInput({
    selectedDate,
    refetchExpenses,
  });

  return (
    <form
      className={styles.inputContainer}
      onSubmit={handleAddExpense}
    >
      <select
        ref={categoryRef}
        defaultValue={DEFAULT_EXPENSE_TYPES[0]}
      >
        {DEFAULT_EXPENSE_TYPES.map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="금액을 입력하세요"
        ref={amountRef}
        onInput={handleInputChange}
      />
      <Button type="submit">
        <PlusCircle></PlusCircle>
      </Button>
    </form>
  );
};
