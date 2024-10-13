import getSession from '@/lib/session';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DollarSign } from 'react-feather';
import { Button } from '../common/Button';
import styles from './index.module.css';

export default function Header() {
  const logOut = async () => {
    'use server';
    const session = await getSession();
    await session.destroy();
    redirect('/');
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link
          href="/"
          className={styles.logoText}
        >
          支出フロー家計簿
        </Link>
        <Link
          href="/"
          className={styles.logoIcon}
        >
          <DollarSign />
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/expenses">支出記録</Link>
        <Link href="/analysis">
          消費パータン分析
        </Link>
      </nav>
      <form action={logOut}>
        <Button>ログアウト</Button>
      </form>
    </div>
  );
}
