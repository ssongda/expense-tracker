import styles from "./index.module.css";

export const Button = ({ ...props }): JSX.Element => {
  return <button className={styles.primary} {...props} />;
};
