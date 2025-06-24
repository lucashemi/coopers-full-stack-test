import knex from "../../config/knexfile";
import { findTaskById } from "../../utils/taskUtils";

export async function deleteTaskById(taskId: number, userId: number) {
  const task = await findTaskById(taskId);
  if (!task) throw new Error("Task not found");

  const { position, done } = task;

  const deletedCount = await knex("tasks").where({ id: taskId }).del();

  if (deletedCount === 0) {
    throw new Error("Failed to delete task");
  }

  // Pull list
  await knex("tasks")
    .where("user_id", userId)
    .andWhere("done", done)
    .andWhere("position", ">", position)
    .decrement("position", 1);

  return;
}
