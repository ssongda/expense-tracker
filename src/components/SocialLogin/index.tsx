import Link from 'next/link';
import { GitHub } from 'react-feather';
import { Button } from '../common/Button';
import styles from './index.module.css';

export default function SocialLogin() {
  return (
    <>
      <div
        className={styles.socialLoginDivider}
      />
      <div
        className={styles.socialLoginContainer}
      >
        <Link href="/github/start">
          <Button large>
            <div
              className={styles.socialLoginButton}
            >
              <GitHub className={styles.icon} />
              <span>Continue with Github</span>
            </div>
          </Button>
        </Link>
      </div>
    </>
  );
}
