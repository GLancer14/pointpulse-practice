import styles from './Header.module.scss'
import { useNavigate } from 'react-router';

export function Header() {
  const navigation = useNavigate();
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>Мои Задачи</h1>
      <button type="button" onClick={() => navigation("/task/create")}>Добавить</button>
    </header>
  );
}