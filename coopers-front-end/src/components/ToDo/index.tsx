import { ToDoTitle } from "../ToDoTitle";
import { ToDoBoard } from "../ToDoBoard";

export function ToDo() {
  return (
    <section
      aria-labelledby="Todo-list-title"
      aria-describedby="todo-description"
    >
      <ToDoTitle />
      <ToDoBoard />
    </section>
  );
}
