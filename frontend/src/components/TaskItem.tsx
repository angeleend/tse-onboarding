import React, { useState } from "react";
import { updateTask } from "src/api/tasks";
import { CheckButton } from "src/components";
import { Dialog } from "@tritonse/tse-constellation";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(null);

  const handleToggleCheck = () => {
    setLoading(true);
    updateTask({
      ...task,
      isChecked: !task.isChecked,
    })
      .then((result) => {
        if (result.success) {
          setTask(result.data);
        } else {
          setErrorModalMessage(result.error);
        }
        setLoading(false);
      })
      .catch(setErrorModalMessage);
  };

  let textContainer = styles.textContainer;
  if (task.isChecked) {
    textContainer += ` ${styles.checked}`;
  }
  return (
    <div className={styles.item}>
      {<CheckButton checked={task.isChecked} disabled={isLoading} onPress={handleToggleCheck} />}
      <div className={textContainer}>
        <span className={styles.title}>{task.title}</span>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>

      <Dialog
        styleVersion="styled"
        variant="error"
        title="An error occurred"
        // Override the text color so it doesn't show white text on a white background
        content={<p className={styles.errorModalText}>{errorModalMessage}</p>}
        isOpen={errorModalMessage !== null}
        onClose={() => setErrorModalMessage(null)}
      />
    </div>
  );
}
