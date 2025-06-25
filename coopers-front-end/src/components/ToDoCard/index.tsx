import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/useTaskContext";
import type { CardNames } from "../../types/CardNames";
import { useRef } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTask } from "../SortableTask";
import { DroppableColumn } from "../DroppableColumn";

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
  const addTaskRef = useRef<HTMLInputElement>(null);

  const cardTasks = tasks.filter((t) => t.done === donePhase);

  function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = addTaskRef.current?.value.trim();
    if (!value) return;

    dispatch({ type: "ADD_TASK", payload: { name: value } });

    addTaskRef.current!.value = "";
  }

  function handleEraseAll() {
    dispatch({
      type: "DELETE_ALL",
      payload: { cardName: title },
    });
  }

  return (
    <div className={cardStyle}>
      <div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>
          {description} <span>{descriptionSpan}</span>
        </p>
      </div>
      {!donePhase && (
        <form onSubmit={handleAddTask} className={styles.form}>
          <input
            type="text"
            placeholder="Add new task"
            className={styles.input}
            ref={addTaskRef}
          />
        </form>
      )}
      <div>
        <DroppableColumn id={donePhase ? "Done" : "To-do"}>
          <SortableContext
            items={cardTasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className={styles.list}>
              {cardTasks.map((task) => (
                <SortableTask key={task.id} task={task} />
              ))}
            </ul>
          </SortableContext>
        </DroppableColumn>
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
