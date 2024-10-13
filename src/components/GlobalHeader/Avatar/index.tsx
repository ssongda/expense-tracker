// AvatarMenu.tsx (Client Component)
'use client';

import { UserType } from '@/domain/model/user';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { User } from 'react-feather';
import styles from './index.module.css';

type Props = {
  user: UserType;
  onLogout: () => {};
};

export default function AvatarMenu({
  user,
  onLogout: handleLogout,
}: Props): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef =
    useRef<HTMLDivElement>(null);
  const avatarRef =
    useRef<HTMLImageElement | null>(null);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleClickOutside = (
    event: MouseEvent,
  ) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(
        event.target as Node,
      ) &&
      avatarRef.current &&
      !avatarRef.current.contains(
        event.target as Node,
      )
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener(
      'mousedown',
      handleClickOutside,
    );
    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
    };
  }, []);

  return (
    <div className={styles.avatarContainer}>
      <div ref={avatarRef} onClick={toggleMenu}>
        {user?.avatar ? (
          <img
            className={styles.avatar}
            src={user.avatar}
          />
        ) : (
          <User onClick={toggleMenu} />
        )}
      </div>
      {menuOpen && (
        <div
          className={styles.dropdownMenu}
          ref={dropdownRef}
        >
          <div className={styles.username}>
            {user?.username}
          </div>
          <div className={styles.divider} />
          <div
            className={styles.menuItem}
            onClick={() => handleLogout()}
          >
            Log out
          </div>
        </div>
      )}
    </div>
  );
}
