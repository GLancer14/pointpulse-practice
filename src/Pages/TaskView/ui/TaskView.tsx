import styles from './TaskView.module.scss'
import { useNavigate, useParams } from 'react-router';
import { useGetTaskById } from '../../../Shared/api';

export function TaskView() {
  const { id } = useParams();
  const navigation = useNavigate();
  const { error, isError, data } = useGetTaskById(id);

  if (isError) {
    return <div>Error: {error?.message}</div>
  }

  return (
    <>
      <h2 className={styles.title}>Просмотр задачи</h2>
      {
        data == null
          ? <div>Такой задачи не существует</div>
          : (<div className={styles.task} key={data.id}>
              <header className={styles.header}>
                <div className={styles.taskTitle}>{data.title}</div>
                <button
                  type="button"
                  onClick={() => {
                    navigation("/");
                  }}
                >
                  Назад
                </button>
              </header>
              <div
                className={styles.description}
              >
                {data.description}
              </div>
            </div>)
      }
    </>
  );
}