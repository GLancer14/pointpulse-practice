import styles from './TaskEdit.module.scss'
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useUpdateTaskMutation, useGetTaskById } from '../../../Shared/api';
import { InputText } from '../../../Shared/ui';

export function TaskEdit() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [initialDataLoaded, setInititalDataLoaded] = useState(false);
  const taskData = useGetTaskById(id);
  const updateTask = useUpdateTaskMutation();

  function hanldeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateTask.mutate({
      id: id,
      title,
      description,
    },
    {
      onSuccess: (editedTask) => {
        navigation(`/task/view/${editedTask.id}`);
      },
      onError: (error) => {
        console.log("Ошибка изменения задачи", error);
        throw new Error("Ошибка изменения задачи");
      }
    });
  }

  useEffect(() => {
    if (taskData.data && initialDataLoaded === false) {
      setTitle(taskData.data.title);
      setDescription(taskData.data.description);
      setInititalDataLoaded(true);
    }
  }, [taskData, initialDataLoaded, useGetTaskById]);

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