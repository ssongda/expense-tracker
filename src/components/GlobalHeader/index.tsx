import { prisma } from '@/lib/prisma';
import getSession from '@/lib/session';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DollarSign } from 'react-feather';
import AvatarMenu from './Avatar';
import styles from './index.module.css';

export default async function Header() {
  const handleLogOut = async () => {
    'use server';
    const session = await getSession();
    await session.destroy();
    redirect('/');
  };

  const getUser = async () => {
    'use server';
    const session = await getSession();
    const data = await prisma.user.findUnique({
      where: {
        id: session.id,
      },
    });

    if (!data) return null;

    return data;
  };

  const user = await getUser();

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
      <div className={styles.menus}>
        <nav className={styles.nav}>
          <Link href="/expenses">支出記録</Link>
          <Link href="/analysis">
            消費パターン分析
          </Link>
        </nav>
        <AvatarMenu
          user={user}
          onLogout={handleLogOut}
        />
      </div>
    </div>
  );
}
