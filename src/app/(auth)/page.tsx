import { Button } from '@/components/common/Button';
import Link from 'next/link';
import styles from './index.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.emoji}>💰</span>
        <h1 className={styles.title}>
          지출 흐름 관리
        </h1>
        <h2 className={styles.subtitle}>
          얼마나 쓰는지 볼까?
        </h2>
      </div>
      <div className={styles.buttonContainer}>
        <Link href="/create-account">
          <Button large>시작하기</Button>
        </Link>
        <div>
          <span>이미 계정이 있나요?</span>{' '}
          <Link
            href="/login"
            className={styles.loginLink}
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
