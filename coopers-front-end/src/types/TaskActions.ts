import type { CardNames } from "./CardNames";
import type { Task } from "./Task";

export type TaskActions =
  | { type: "ADD_TASK"; payload: { name: string } }
  | { type: "TOGGLE_DONE"; payload: { id: number } }
  | { type: "EDIT_TASK"; payload: { id: number; name: string } }
  | { type: "DELETE_TASK"; payload: { id: number } }
  | { type: "DELETE_ALL"; payload: { cardName: CardNames } }
  | { type: "SET_TASKS"; payload: { tasks: Task[] } };
