import styles from "./styles.module.css";
import check from "../../assets/icons/icon-check.svg";
import doneCheck from "../../assets/icons/icon-check-done.svg";
import { useTaskContext } from "../../contexts/useTaskContext";
import { EditableText } from "../EditableText";
import { forwardRef } from "react";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

type ToDoItemProps = {
  id: number;
  name: string;
  done?: boolean;
  dragHandleProps: SyntheticListenerMap | undefined;
  style: React.CSSProperties;
};

export const ToDoItem = forwardRef(function ToDoItem(
  { id, name, done = false, dragHandleProps, ...rest }: ToDoItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const { dispatch } = useTaskContext();

  const iconCircleStyle = done
    ? `${styles.iconCircle} ${styles.iconCircleDone}`
    : `${styles.iconCircle} ${styles.iconCircleTodo}`;

  function handleClickDone() {
    dispatch({
      type: "TOGGLE_DONE",
      payload: { id },
    });
  }

  function handleEdit(newValue: string) {
    dispatch({
      type: "EDIT_TASK",
      payload: { id, name: newValue },
    });
  }

  function handleClickDelete() {
    dispatch({
      type: "DELETE_TASK",
      payload: { id },
    });
  }

  return (
    <li ref={ref} className={styles.item} {...rest}>
      <div className={styles.itemContent}>
        <button
          {...dragHandleProps}
          className={styles.dragHandle}
          role="button"
        >
          ≡
        </button>
        <span onClick={handleClickDone} className={iconCircleStyle}>
          {!done ? (
            <img src={check} alt="Check" className={styles.check} />
          ) : (
            <img src={doneCheck} alt="Done" />
          )}
        </span>
        <EditableText
          initialValue={name}
          onConfirm={handleEdit}
          inputClassName={styles.editing}
          autoFocus
        />
      </div>
      <button onClick={handleClickDelete} className={styles.deleteButton}>
        delete
      </button>
    </li>
  );
});
