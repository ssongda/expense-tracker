import { Button } from '@/components/common/Button';
import { PlusCircle } from 'react-feather';
import { useExpenseInput } from './hooks';
import styles from './index.module.css';

const DEFAULT_EXPENSE_TYPES = [
  '食費',
  '交通費',
  '日用品',
  '水道・光熱',
  '通信費',
  'お住まい',
  '依頼',
  'レジャー',
  '美容',
  '書籍',
  '医療費',
  '教育',
  '貯金',
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
        placeholder="金額を入力してください"
        ref={amountRef}
        onInput={handleInputChange}
      />
      <Button type="submit">
        <PlusCircle />
      </Button>
    </form>
  );
};
