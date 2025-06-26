import { TOP_OF_LIST_POSITION } from "../../constants/taskConstants";
import type { Task } from "../../types/Task";
import type { TaskActions } from "../../types/TaskActions";

export function taskReducer(state: Task[], action: TaskActions): Task[] {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask: Task = {
        id: Date.now(),
        name: action.payload.name,
        done: false,
        position: TOP_OF_LIST_POSITION,
      };
      return [newTask, ...state];
    }

    case "TOGGLE_DONE":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, done: !task.done, position: TOP_OF_LIST_POSITION }
          : { ...task, position: task.position + 1 }
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
      const { columnName } = action.payload;

      switch (columnName) {
        case "To-do":
          return state.filter((task) => task.done);
        case "Done":
          return state.filter((task) => !task.done);
        default:
          return [];
      }
    }

    case "SET_TASKS":
      return action.payload.tasks;

    default:
      return state;
  }
}
