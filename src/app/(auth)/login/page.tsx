'use client';

import { Button } from '@/components/common/Button';
import FormInput from '@/components/common/Input';
import SocialLogin from '@/components/SocialLogin';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';
import Link from 'next/link';
import { useActionState } from 'react';
import { logIn } from './actions';
import styles from './index.module.css';

export default function Login() {
  const [state, action] = useActionState(
    logIn,
    null,
  );
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.h1}>
          돌아온 걸 환영해!
        </h1>
      </div>
      <form
        className={styles.form}
        action={action}
      >
        <div className={styles.inputContainer}>
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
            required
            minLength={PASSWORD_MIN_LENGTH}
            errors={state?.fieldErrors.password}
          />
        </div>
        <Button large>로그인</Button>
      </form>
      <div>
        <span>계정이 없나요?</span>{' '}
        <Link
          href="/create-account"
          className={styles.loginLink}
        >
          계정 만들기
        </Link>
      </div>
      <div className={styles.divider} />
      <SocialLogin />
    </div>
  );
}