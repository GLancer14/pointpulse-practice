import styles from "./ErrorMessage.module.scss";

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className={styles.wrp}>
      <div className={styles.header}>Ошибка</div>
      <div className={styles.message}>{message}</div>
    </div>
  );
}