import styles from "./Main.module.scss";
import { useInfiniteTasks } from "../../../../Shared/api";
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Task as TaskBlock } from '../Task/Task';
import { ErrorMessage } from "../../../../Shared/ui";

export function Main() {
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
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allTasks = data?.pages.flatMap(page => page.data) || [];

  return (
    <div className={styles.tasksWrp}>
      <h2 className={styles.wrpHeader}>Задачи</h2>
      <section className={styles.tasks}>
        {isLoading ? "Loading..." : allTasks.map((taskData, ind) => {
          return <TaskBlock taskData={taskData} ind={ind} key={taskData.id} />;
        })}
        {isError && <ErrorMessage message={error?.message || "Ошибка получения данных"} />}
      </section>
      {hasNextPage && <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>}
    </div>
  )
}
