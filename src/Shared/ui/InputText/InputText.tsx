import styles from './InputText.module.scss'
import type { Dispatch, SetStateAction } from 'react';

export interface InputTextPropsType {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  title: string;
  placeholder?: string;
  required?: boolean;
}

export function InputText({
  value,
  setValue,
  title,
  placeholder,
  required,
}: InputTextPropsType) {
  return (
    <label className={styles.label}>
      <span>{title}</span>
      <input
        className={styles.inputText}
        type="text"
        onInput={(e) => {
          setValue(e.currentTarget.value);
        }}
        value={value}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}