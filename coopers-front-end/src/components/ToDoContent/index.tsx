import { ToDoCard } from "../ToDoCard";

import styles from "./styles.module.css";
import { useDndSortable } from "../../hooks/useDndSortable";
import type { Task } from "../../types/Task";
import { useTasksManager } from "../../hooks/useTasksManager";

export function ToDoContent() {
  const { tasks, reorderTasks } = useTasksManager();

  const doneCount = tasks?.filter((t) => t.done).length;
  const taskSummary = (
    <strong>
      You have done {doneCount} task{doneCount !== 1 ? "s" : ""}
    </strong>
  );

  const onReorder = (newOrder: Task[]) => {
    reorderTasks(newOrder);
  };

  const { DndWrapper } = useDndSortable({ tasks, onReorder });

  return (
    <section>
      <DndWrapper>
        <div className={styles.cardContainer}>
          <ToDoCard
            title="To-do"
            description="Take a breath."
            descriptionSpan="Start doing."
          />
          <ToDoCard
            title="Done"
            description="Congratulions!"
            descriptionSpan={taskSummary}
            donePhase
          />
        </div>
      </DndWrapper>
    </section>
  );
}
