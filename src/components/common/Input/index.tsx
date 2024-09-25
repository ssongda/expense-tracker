import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
} from 'react';
import styles from './index.module.css';

interface InputProps {
  name: string;
  errors?: string[];
}

const _Input = (
  {
    name,
    errors = [],
    ...rest
  }: InputProps &
    InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div className={styles.inputContainer}>
      <input
        ref={ref}
        name={name}
        className={styles.input}
        {...rest}
      />
      {errors.map((error, index) => (
        <span
          key={index}
          className={styles.errorMessage}
        >
          {error}
        </span>
      ))}
    </div>
  );
};

export default forwardRef(_Input);
