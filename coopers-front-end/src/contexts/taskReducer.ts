import type { Task } from "../types/Task";
import type { TaskActions } from "../types/TaskActions";

export function taskReducer(state: Task[], action: TaskActions): Task[] {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask: Task = {
        id: Date.now(),
        name: action.payload.name,
        done: false,
      };
      return [newTask, ...state];
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

    case "REORDER_TASKS": {
      const { cardName, newOrder } = action.payload;

      const cardNewOrder = newOrder
        .map((id) => state.find((task) => task.id === id))
        .filter((task): task is Task => Boolean(task));

      switch (cardName) {
        case "To-do":
          return [...cardNewOrder, ...state.filter((task) => task.done)];
        case "Done":
          return [...state.filter((task) => !task.done), ...cardNewOrder];
        default:
          return state;
      }
    }

    case "SET_TASKS":
      return action.payload.tasks;

    default:
      return state;
  }
}
