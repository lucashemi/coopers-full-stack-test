import styles from "./styles.module.css";
import check from "../../assets/icons/icon-check.svg";
import doneCheck from "../../assets/icons/icon-check-done.svg";

type ToDoItemProps = {
  name: string;
  done?: boolean;
  editing?: boolean;
};

export function ToDoItem({
  name,
  done = false,
  editing = false,
}: ToDoItemProps) {
  const iconCircleStyle = done
    ? `${styles.iconCircle} ${styles.iconCircleDone}`
    : `${styles.iconCircle} ${styles.iconCircleTodo}`;

  return (
    <li className={styles.item}>
      <div className={styles.itemContent}>
        <span className={iconCircleStyle}>
          {!done ? (
            <img src={check} alt="Check" className={styles.check} />
          ) : (
            <img src={doneCheck} alt="Done" />
          )}
        </span>
        {editing ? (
          <input className={styles.editing} value={name} />
        ) : (
          <span>{name}</span>
        )}
      </div>
      <button className={styles.deleteButton}>delete</button>
    </li>
  );
}
