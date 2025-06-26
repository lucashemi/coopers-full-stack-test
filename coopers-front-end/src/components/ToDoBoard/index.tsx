import { useTasksManager } from "../../contexts/task/useTasksManager";
import { useDndSortable } from "../../hooks/useDndSortable";
import { ToDoColumn } from "../ToDoColumn";
import type { Task } from "../../types/Task";

import styles from "./styles.module.css";

export function ToDoBoard() {
  const { tasks, reorderTasks } = useTasksManager();

  const onReorder = (newOrder: Task[]) => {
    reorderTasks(newOrder);
  };

  const { DndWrapper } = useDndSortable({ tasks, onReorder });

  return (
    <div>
      <DndWrapper>
        <div className={styles.cardContainer}>
          <ToDoColumn
            title="To-do"
            description="Take a breath."
            descriptionSpan="Start doing."
          />
          <ToDoColumn
            title="Done"
            description="Congratulations!"
            descriptionSpan={"You have done 0 tasks."}
            isDoneColumn
          />
        </div>
      </DndWrapper>
    </div>
  );
}
