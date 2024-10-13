'use client';

import React, { useState } from 'react';
import styles from './index.module.css';

const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ログインロジック
    console.log('ログイン試行:', email, password);
  };

  return (
    <div className={styles.loginContainer}>
      <form
        onSubmit={handleSubmit}
        className={styles.loginForm}
      >
        <h2>ログイン</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Eメール</label>
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
            パスワード
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
          ログイン
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
