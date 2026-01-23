import styles from './TaskCreate.module.scss'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useCreateTaskMutation } from '../../../Shared/api';
import { InputText } from '../../../Shared/ui';

export function TaskCreate() {
  const navigation = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const createTask = useCreateTaskMutation();

  async function hanldeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createTask.mutate(
      {
        title,
        description,
      },
      {
        onSuccess: (createdTask) => {
          navigation(`/task/view/${createdTask.id}`);
        },
        onError: (error) => {
          console.log("Ошибка создания задачи", error);
          throw new Error("Ошибка создания задачи");
        }
      }
    );
  }

  return (
    <form className={styles.form} onSubmit={e => hanldeSubmit(e)}>
      <h2>Добавить задачу</h2>
      <InputText
        value={title}
        setValue={setTitle}
        title={"Заголовок"}
        placeholder={"Введите заголовок"}
        required={true}
      />
      <InputText
        value={description}
        setValue={setDescription}
        title={"Описание"}
        placeholder={"Введите описание"}
        required={true}
      />
      <button className={styles.submit}>
        Создать
      </button>
    </form>
  );
}