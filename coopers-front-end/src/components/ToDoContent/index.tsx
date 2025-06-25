import { ToDoCard } from "../ToDoCard";

import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/useTaskContext";
import { useDndSortable } from "../../hooks/useDndSortable";
import type { Task } from "../../types/Task";

export function ToDoContent() {
  const { tasks, dispatch } = useTaskContext();

  const doneCount = tasks.filter((t) => t.done).length;
  const taskSummary = (
    <strong>
      You have done {doneCount} task{doneCount !== 1 ? "s" : ""}
    </strong>
  );

  const onReorder = (newOrder: Task[]) => {
    dispatch({
      type: "SET_TASKS",
      payload: { tasks: newOrder },
    });
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
