import styles from './TaskView.module.scss'
import type { Task } from "../../../Shared/api";
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getTaskById } from '../../../Shared/api';

export function TaskView() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [taskData, setTaskData] = useState<Task | null>(null);

  function handleGetTask(id: string | undefined) {
    if (id) {
      const foundTaskData = getTaskById(id);

      if (!foundTaskData) {
        throw new Error("Такой задачи не существует");
      }

      setTaskData(foundTaskData);
    }
  }

  useEffect(() => {
    handleGetTask(id);
  }, [])

  return (
    <>
      <h2 className={styles.title}>Просмотр задачи</h2>
      {
        taskData == null
          ? <div>Такой задачи не существует</div>
          : (<div className={styles.task} key={taskData.id}>
              <header className={styles.header}>
                <div className={styles.taskTitle}>{taskData.title}</div>
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
                {taskData.description}
              </div>
            </div>)
      }
    </>
  );
}