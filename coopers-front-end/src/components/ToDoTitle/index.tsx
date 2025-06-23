import styles from "./styles.module.css";

export function ToDoTitle() {
  return (
    <section id="Todo-list-title" className={styles.container}>
      <div className={styles.background}>
        <h1 className={styles.title}>To-do list</h1>
        <p className={styles.description}>
          Drag and drop to set your main priorities, check when done and create
          what's new.
        </p>
      </div>
    </section>
  );
}
