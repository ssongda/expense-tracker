'use client';

import React, { useState } from 'react';
import styles from './index.module.css';

const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 로그인 로직을 구현하세요
    console.log('로그인 시도:', email, password);
  };

  return (
    <div className={styles.loginContainer}>
      <form
        onSubmit={handleSubmit}
        className={styles.loginForm}
      >
        <h2>로그인</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e =>
              setEmail(e.target.value)
            }
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e =>
              setPassword(e.target.value)
            }
            required
          />
        </div>
        <button
          type="submit"
          className={styles.loginButton}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
