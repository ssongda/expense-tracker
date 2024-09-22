import { formatNumber } from '@/utils/common/formatNumber';
import styles from './index.module.css';

export const ExpenseTotal = ({ totalAmount }: { totalAmount: string }) => {
  return (
    <div className={styles.totalAmountWrapper}>
      <h1>TOTAL</h1>
      <h1>{formatNumber(totalAmount)}</h1>
    </div>
  );
};
