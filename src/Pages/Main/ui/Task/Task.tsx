import styles from './Task.module.scss'
import { Pencil, Trash2 } from "lucide-react";
import { useDeleteTaskMutation, type Task } from "../../../../Shared/api";
import { useRef } from 'react';
import { useIsOverflowing } from '../../../../Shared/hooks/overflow';
import { Link, useNavigate } from 'react-router';

export function Task({ taskData, ind }: { taskData: Task, ind: number }) {
  const navigation = useNavigate();
  const description = useRef(null);
  const overflow = useIsOverflowing(description);
  const deleteTask = useDeleteTaskMutation();

  function handleDeleteTask(id: string) {
    deleteTask.mutate(
      id,
      {
        onSuccess: (deletedTask) => {
          alert(`Задача ${deletedTask.title} успешно удалена!`);
        },
        onError: (error) => {
          console.log("Ошибка удаления задачи", error);
          throw new Error("Ошибка удаления задачи");
        }
      },
    );
  }

  return (
    <article className={styles.task}>
      <header className={styles.header}>
        <div className={styles.title}>{ind + 1}. {taskData.title}</div>
        <div className={styles.btnsWrp}>
          <button
            type="button"
            onClick={() => {
              navigation(`/task/update/${taskData.id}`);
            }}
          >
            <Pencil />
          </button>
          <button
            type="button"
            onClick={() => {
              const deleteConfirm = confirm(`Вы уверены, что хотите удалить ${taskData.title}`);
              if (deleteConfirm) {
                handleDeleteTask(taskData.id);
              }
            }}
          >
            <Trash2 />
          </button>
        </div>
      </header>
      <div
        className={styles.description}
        ref={description}
      >
        {taskData.description}
      </div>
      <div className={styles.viewBtn}>
        {overflow
          && <Link to={`/task/view/${taskData.id}`}>Просмотр</Link>
        }
      </div>
    </article>
  );
}