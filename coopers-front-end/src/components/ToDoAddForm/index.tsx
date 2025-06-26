import { useRef } from "react";

import styles from "./styles.module.css";

type TaskFormProps = {
  onAddTask: (value: string) => void;
};

export function ToDoAddForm({ onAddTask }: TaskFormProps) {
  const addTaskRef = useRef<HTMLInputElement>(null);

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = addTaskRef.current?.value.trim();
    if (value) onAddTask(value);
    addTaskRef.current!.value = "";
  };

  return (
    <form onSubmit={handleAddTask}>
      <input
        type="text"
        placeholder="Add new task"
        className={styles.input}
        ref={addTaskRef}
        aria-label="Add a new task"
      />
    </form>
  );
}
