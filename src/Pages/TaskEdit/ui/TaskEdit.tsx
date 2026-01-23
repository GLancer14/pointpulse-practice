import styles from './TaskEdit.module.scss'
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getTaskById, updateTask } from '../../../Shared/api/client';
import { InputText } from '../../../Shared/ui';

export function TaskEdit() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSearchUpdatedTask(id: string) {
    const editedTaskSearchResult = getTaskById(id);
    if (!editedTaskSearchResult) {
      throw new Error("Такой задачи не существует");
    }

    setTitle(editedTaskSearchResult.title);
    setDescription(editedTaskSearchResult.description);
  }

  function hanldeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const editedTask = updateTask({
      id: id,
      title,
      description,
    });

    if (!editedTask) {
      throw new Error("Ошибка создания задачи");
    }

    navigation(`/task/view/${editedTask.id}`);
  }

  useEffect(() => {
    if (id) {
      handleSearchUpdatedTask(id);
    }
  }, []);

  return (
    <form className={styles.form} onSubmit={e => hanldeSubmit(e)}>
      <h2>Изменить задачу</h2>
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
        Внести изменения
      </button>
    </form>
  );
}