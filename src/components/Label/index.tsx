import styles from './index.module.css';

export const Label = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className={styles.label}>{children}</div>
  );
};
