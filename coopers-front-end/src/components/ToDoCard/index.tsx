import styles from "./styles.module.css";
import { ToDoItem } from "../ToDoItem";
import type { Task } from "../../types/Task";

type ToDoCardProps = {
  title: string;
  description: string;
  descriptionSpan: string | React.ReactNode;
  donePhase?: boolean;
  tasks: Task[];
};

export function ToDoCard({
  title,
  description,
  descriptionSpan,
  donePhase = false,
  tasks,
}: ToDoCardProps) {
  const cardStyle = donePhase
    ? `${styles.card} ${styles.cardDone}`
    : styles.card;
  /*
    function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
    */
  return (
    <div className={cardStyle}>
      <div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>
          {description} <span>{descriptionSpan}</span>
        </p>
      </div>
      {/*<form onSubmit={handleAddTask} className={styles.form}>
        <input
          type="text"
          placeholder="Add new task"
          className={styles.input}
        />
        <button type="submit" className={styles.addButton}>
          +
        </button>
      </form>*/}
      <div>
        <ul className={styles.list}>
          {tasks.map((task) => (
            <ToDoItem key={task.id} name={task.name} done={task.done} />
          ))}
        </ul>
      </div>
      <div>
        <button className={styles.eraseAllButton}>erase all</button>
      </div>
    </div>
  );
}
