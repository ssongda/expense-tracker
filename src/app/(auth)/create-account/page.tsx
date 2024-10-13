'use client';

import { Button } from '@/components/common/Button';
import FormInput from '@/components/common/Input';
import SocialLogin from '@/components/SocialLogin';
import Link from 'next/link';
import { useActionState } from 'react';
import { createAccount } from './actions';
import styles from './index.module.css';

export default function CreateAccount() {
  const [state, action] = useActionState(
    createAccount,
    null,
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.h1}>
          初めまして!
        </h1>
      </div>
      <form
        className={styles.form}
        action={action}
      >
        <div className={styles.inputContainer}>
          <FormInput
            name="username"
            type="text"
            placeholder="Username"
            required
            errors={state?.fieldErrors.username}
            minLength={3}
            maxLength={10}
          />
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={state?.fieldErrors.email}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            minLength={4}
            required
            errors={state?.fieldErrors.password}
          />
          <FormInput
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            required
            minLength={4}
            errors={
              state?.fieldErrors.confirm_password
            }
          />
        </div>
        <Button large>始めましょう!</Button>
      </form>
      <div>
        <span>アカウントがありますか?</span>{' '}
        <Link
          href="/login"
          className={styles.loginLink}
        >
          ログイン
        </Link>
      </div>
      <div className={styles.divider} />
      <SocialLogin />
    </div>
  );
}
