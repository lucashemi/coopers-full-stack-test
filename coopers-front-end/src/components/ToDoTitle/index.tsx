import styles from "./styles.module.css";

export function ToDoTitle() {
  return (
    <header className={styles.container}>
      <div className={styles.background}>
        <h2 className={styles.title} id="Todo-list-title">
          To-do list
        </h2>
        <p className={styles.description} id="todo-description">
          Drag and drop to set your main priorities, check when done and create
          what's new.
        </p>
      </div>
    </header>
  );
}
