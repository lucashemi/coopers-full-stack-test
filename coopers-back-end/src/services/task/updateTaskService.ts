import knex from "../../config/knexfile";
import { TOP_OF_LIST_POSITION } from "../../constants/taskConstants";
import {
  findTaskById,
  pullTasksUp,
  pushTasksDown,
} from "../../utils/taskUtils";

export async function updateTaskService(
  taskId: number,
  updates: Partial<{ name: string | undefined; done: string | undefined }>
) {
  const task = await findTaskById(taskId);
  if (!task) throw new Error("Task not found");

  const finalUpdates: any = {};

  // Update name
  if (updates?.name != null) {
    finalUpdates.name = updates.name;
  }

  // Update status
  const done = String(updates.done) === "true";
  if (updates.done != null && done !== task.done) {
    finalUpdates.done = done;
    finalUpdates.position = TOP_OF_LIST_POSITION;

    // Pull previous list tasks
    pullTasksUp(task.user_id, !done, task.position);

    // Push new list tasks
    pushTasksDown(task.user_id, done);
  }

  await knex("tasks").where({ id: taskId }).update(finalUpdates);

  return await findTaskById(taskId);
}
