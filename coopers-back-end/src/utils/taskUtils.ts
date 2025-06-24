import knex from "../config/knexfile";
import { Task } from "../models/Task";

export async function findTaskById(id: number): Promise<Task | null> {
  const task = await knex("tasks").where({ id }).first();
  return task ?? null;
}

// Push all tasks down (ex: add a new task)
export async function pushTasksDown(userId: number, done: boolean) {
  await knex("tasks")
    .where("user_id", userId)
    .andWhere("done", done)
    .increment("position", 1);
}

// Pull all tasks up (ex: when a task is moved/deleted)
export async function pullTasksUp(
  userId: number,
  done: boolean,
  position: number
) {
  await knex("tasks")
    .where("user_id", userId)
    .andWhere("done", done)
    .andWhere("position", ">", position)
    .decrement("position", 1);
}
