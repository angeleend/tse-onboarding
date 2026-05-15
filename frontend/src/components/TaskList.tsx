import React, { useEffect, useState } from "react";
import { getAllTasks, type Task } from "src/api/tasks";
import { TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

export type TaskListProps = {
  title: string;
};

export function TaskList({ title }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllTasks()
      .then((result) => {
        if (result.success) {
          setTasks(result.data);
        } else {
          setErrorModalMessage(result.error);
        }
      })
      .catch(setErrorModalMessage);
  }, []);

  return (
    <div className={styles.topMargin}>
      <span className={styles.title}>{title}</span>
      <div className={styles.itemContainer}>
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one above to get started.</p>
        ) : (
          tasks.map((task) => <TaskItem key={task._id} task={task} />)
        )}
      </div>
    </div>
  );
}
