import { ToDoCard } from "../ToDoCard";

import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/useTaskContext";

export function ToDoContent() {
  const { tasks } = useTaskContext();

  const doneCount = tasks.filter((t) => t.done).length;
  const taskSummary = (
    <strong>
      You have done {doneCount} task{doneCount !== 1 ? "s" : ""}
    </strong>
  );

  return (
    <section>
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
    </section>
  );
}
