import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTask } from "../SortableTask";
import { useTasksManager } from "../../contexts/task/useTasksManager";
import type { ColumnName } from "../../types/ColumnName";
import { DroppableColumn } from "../DroppableColumn";

import styles from "./styles.module.css";
import { ToDoAddForm } from "../ToDoAddForm";

type ToDoColumnProps = {
  title: ColumnName;
  description: string;
  descriptionSpan: string | React.ReactNode;
  isDoneColumn?: boolean;
};

export function ToDoColumn({
  title,
  description,
  descriptionSpan,
  isDoneColumn = false,
}: ToDoColumnProps) {
  const columnStyle = isDoneColumn
    ? `${styles.column} ${styles.columnDone}`
    : styles.column;

  const { tasks, addTask, deleteAllTasks } = useTasksManager();

  const filteredColumnTasks = tasks
    ?.filter((t) => t.done === isDoneColumn)
    .sort((a, b) => a.position - b.position);

  const taskSummary = isDoneColumn ? (
    <strong>
      You have done {filteredColumnTasks.length} task
      {filteredColumnTasks.length !== 1 ? "s" : ""}
    </strong>
  ) : (
    descriptionSpan
  );

  function handleEraseAll() {
    deleteAllTasks(title);
  }

  return (
    <section className={columnStyle}>
      <header>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>
          {description} <span>{taskSummary}</span>
        </p>
      </header>
      {!isDoneColumn && <ToDoAddForm onAddTask={addTask} />}
      <DroppableColumn id={title}>
        <SortableContext
          items={filteredColumnTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className={styles.list}>
            {filteredColumnTasks.map((task) => (
              <SortableTask key={task.id} task={task} />
            ))}
          </ul>
        </SortableContext>
      </DroppableColumn>
      <footer>
        <button
          type="button"
          onClick={handleEraseAll}
          className={styles.eraseAllButton}
          aria-label="Erase all tasks in this column"
        >
          erase all
        </button>
      </footer>
    </section>
  );
}
