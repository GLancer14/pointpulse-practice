import styles from './Main.module.scss'
import { useInfiniteTasks } from "../../../../Shared/api";
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router';
import { Task as TaskBlock } from '../Task/Task';

export function Main() {
  const navigation = useNavigate();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteTasks(3);
  
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 500,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return <div>Error: {error?.message}</div>
  }

  const allTasks = data?.pages.flatMap(page => page.data) || [];

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Мои Задачи</h1>
        <button type="button" onClick={() => navigation("/task/create")}>Добавить</button>
      </header>
      <div className={styles.tasksWrp}>
        <h2 className={styles.wrpHeader}>Задачи</h2>
        <section className={styles.tasks}>
          {!isLoading && allTasks.map((taskData, ind) => {
            return <TaskBlock taskData={taskData} ind={ind} key={taskData.id} />;
          })}
        </section>
        {hasNextPage && <div ref={ref}></div>}
      </div>
    </main>
  )
}
