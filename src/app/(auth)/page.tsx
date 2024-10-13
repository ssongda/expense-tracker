import { Button } from '@/components/common/Button';
import Link from 'next/link';
import styles from './index.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.emoji}>💰</span>
        <h1 className={styles.title}>
          支出フロー管理
        </h1>
        <h2 className={styles.subtitle}>
          どれくらい使うか見ようか？
        </h2>
      </div>
      <div className={styles.buttonContainer}>
        <Link href="/create-account">
          <Button large>始める</Button>
        </Link>
        <div>
          <span>アカウントがありますか？</span>{' '}
          <Link
            href="/login"
            className={styles.loginLink}
          >
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
}
