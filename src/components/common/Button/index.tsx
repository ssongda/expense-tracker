'use client';

import { ButtonHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';
import styles from './index.module.css';

type Props =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    large?: boolean;
    children: React.ReactNode;
    className?: string;
  };

export const Button = ({
  large,
  children,
  className,
  ...props
}: Props): JSX.Element => {
  const { pending } = useFormStatus();

  const buttonClasses = [
    styles.button,
    large && styles.large,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClasses}
      {...props}
      disabled={pending}
    >
      {pending ? 'Loading...' : children}
    </button>
  );
};
