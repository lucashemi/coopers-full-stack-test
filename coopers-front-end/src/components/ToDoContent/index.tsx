import { ToDoCard } from "../ToDoCard";
import { defaultTasks } from "../../constants/defaultTasks";

import styles from "./styles.module.css";

export function ToDoContent() {
  const toDoTasks = defaultTasks.filter((task) => !task.done);
  const doneTasks = defaultTasks.filter((task) => task.done);

  const doneTasksSum = doneTasks.length;
  const taskSummary = (
    <strong>
      You have done {doneTasksSum} task{doneTasksSum !== 1 ? "s" : ""}
    </strong>
  );

  return (
    <section>
      <div className={styles.cardContainer}>
        <ToDoCard
          title="To-do"
          description="Take a breath."
          descriptionSpan="Start doing."
          tasks={toDoTasks}
        />
        <ToDoCard
          title="Done"
          description="Congratulions!"
          descriptionSpan={taskSummary}
          donePhase
          tasks={doneTasks}
        />
      </div>
    </section>
  );
}
