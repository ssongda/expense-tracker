import Link from 'next/link';
import { DollarSign } from 'react-feather';
import styles from './index.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link
          href="/"
          className={styles.logoText}
        >
          지출 흐름 가계부
        </Link>
        <Link
          href="/"
          className={styles.logoIcon}
        >
          <DollarSign />
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/expenses">지출 기록</Link>
        <Link href="/analysis">
          소비 패턴 분석
        </Link>
      </nav>
    </header>
  );
}
