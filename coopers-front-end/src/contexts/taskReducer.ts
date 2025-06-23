import type { Task } from "../types/Task";
import type { TaskActions } from "../types/taskActions";

export function taskReducer(state: Task[], action: TaskActions): Task[] {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask: Task = {
        id: Date.now(),
        name: action.payload.name,
        done: false,
      };
      return [...state, newTask];
    }

    case "TOGGLE_DONE":
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, done: !task.done } : task
      );

    case "EDIT_TASK":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, name: action.payload.name }
          : task
      );

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload.id);

    case "DELETE_ALL": {
      const { cardName } = action.payload;

      switch (cardName) {
        case "To-do":
          return state.filter((task) => task.done);
        case "Done":
          return state.filter((task) => !task.done);
        default:
          return [];
      }
    }

    case "REORDER_TASKS":
      return action.payload.tasks;

    case "SET_TASKS":
      return action.payload.tasks;

    default:
      return state;
  }
}
