import styles from './TaskCreate.module.scss'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { createTask } from '../../../Shared/api/client';
import { InputText } from '../../../Shared/ui';

export function TaskCreate() {
  const navigation = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function hanldeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const createdTask = createTask({
      title,
      description,
    });

    if (!createdTask) {
      throw new Error("Ошибка создания задачи");
    }

    navigation(`/task/view/${createdTask.id}`);
  }

  return (
    <form className={styles.form} onSubmit={e => hanldeSubmit(e)}>
      <h2>Добавить задачу</h2>
      <InputText
        value={title}
        setValue={setTitle}
        title={"Заголовок"}
        placeholder={"Введите заголовок"}
      />
      <InputText
        value={description}
        setValue={setDescription}
        title={"Описание"}
        placeholder={"Введите описание"}
      />
      <button className={styles.submit}>
        Создать
      </button>
    </form>
  );
}