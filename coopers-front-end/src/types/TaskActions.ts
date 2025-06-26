import type { ColumnName } from "./ColumnName";
import type { Task } from "./Task";

export type TaskActions =
  | { type: "ADD_TASK"; payload: { name: string } }
  | { type: "TOGGLE_DONE"; payload: { id: number } }
  | { type: "EDIT_TASK"; payload: { id: number; name: string } }
  | { type: "DELETE_TASK"; payload: { id: number } }
  | { type: "DELETE_ALL"; payload: { columnName: ColumnName } }
  | { type: "SET_TASKS"; payload: { tasks: Task[] } };
