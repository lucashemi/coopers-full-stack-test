import styles from "./styles.module.css";
import { ToDoItem } from "../ToDoItem";
import { useTaskContext } from "../../contexts/useTaskContext";
import type { CardNames } from "../../types/CardNames";

type ToDoCardProps = {
  title: CardNames;
  description: string;
  descriptionSpan: string | React.ReactNode;
  donePhase?: boolean;
};

export function ToDoCard({
  title,
  description,
  descriptionSpan,
  donePhase = false,
}: ToDoCardProps) {
  const cardStyle = donePhase
    ? `${styles.card} ${styles.cardDone}`
    : styles.card;

  const { tasks, dispatch } = useTaskContext();

  const filteredTasks = donePhase
    ? tasks.filter((t) => t.done)
    : tasks.filter((t) => !t.done);

  function handleEraseAll() {
    dispatch({
      type: "DELETE_ALL",
      payload: { cardName: title },
    });
  }

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
          {filteredTasks.map((task) => (
            <ToDoItem
              key={task.id}
              id={task.id}
              name={task.name}
              done={task.done}
            />
          ))}
        </ul>
      </div>
      <div>
        <button
          type="button"
          onClick={handleEraseAll}
          className={styles.eraseAllButton}
        >
          erase all
        </button>
      </div>
    </div>
  );
}
