import styles from './Main.module.scss'
import { getTasks, type Task } from "../../../../Shared/api";
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link, useNavigate } from 'react-router';
import { Task as TaskBlock } from '../Task/Task';

export function Main() {
  const navigation = useNavigate();
  const [page, setPage] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 500,
  });

  const fetchTasks = (isInitialLoad = false) => {
    const loadedTasks = getTasks({
      per_page: 3,
      page: page,
    });

    if (loadedTasks) {
      if (isInitialLoad) {
        setTasks(loadedTasks);
        setPage(1);
      } else {
        setTasks(prevTasks => [ ...prevTasks, ...loadedTasks ]);
        setPage(previosPage => previosPage + 1);
      }
    }

    if (isInitialLoad) {
      setInitialLoadDone(true);
    }
  }

  useEffect(() => {
    if (!initialLoadDone) {
      fetchTasks(true);
    }
  }, [initialLoadDone]);

  useEffect(() => {
    if (inView === true) {
      fetchTasks(false);
    }
  }, [inView]);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Мои Задачи</h1>
        <button type="button" onClick={() => navigation("/task/create")}>Добавить</button>
      </header>
      <div className={styles.tasksWrp}>
        <h2 className={styles.wrpHeader}>Задачи</h2>
        <section className={styles.tasks}>
          {tasks.map((taskData, ind) => {
            return <TaskBlock taskData={taskData} ind={ind} key={taskData.id} />;
          })}
        </section>
        <div ref={ref}></div>
      </div>
    </main>
  )
}
