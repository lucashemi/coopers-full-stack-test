import { Request, Response } from "express";
import knex from "../config/knexfile";
import { findTaskById, pushTasksDown } from "../utils/taskUtils";
import { TOP_OF_LIST_POSITION } from "../constants/taskConstants";
import { updateTaskService } from "../services/task/updateTaskService";
import { deleteTaskById } from "../services/task/deleteTaskService";

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const tasks = await knex("tasks")
    .where({ user_id: userId })
    .orderBy("position", "asc");

  res.json(tasks);
  return;
};

// Add a new task
export const addTask = async (req: Request, res: Response) => {
  const { name } = req.body;
  const userId = req.user?.id;

  if (typeof name !== "string" || name.trim() === "") {
    res.status(400).json({ error: "Invalid name" });
    return;
  }

  try {
    pushTasksDown(userId!, false);

    const [newTaskId] = await knex("tasks").insert({
      name,
      position: TOP_OF_LIST_POSITION,
      user_id: userId,
    });

    const newTask = await findTaskById(newTaskId);

    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error on create task:", err);
    res.status(500).json({ error: "Error on create task" });
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.taskId);
  const { name, done } = req.body;

  try {
    const updatedTaskData = await updateTaskService(taskId, {
      name,
      done,
    });

    res.json(updatedTaskData);
    return;
  } catch (err: any) {
    console.error("Error on update task:", err);
    res.status(500).json({ error: err.message ?? "Error on update task" });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.taskId);
  const userId = req.user?.id;

  await deleteTaskById(taskId, userId!);

  res.json({ message: "Task deleted successfully" });
  return;
};

// Delete all tasks
export const deleteAllTasks = async (req: Request, res: Response) => {
  const done = String(req.query.done) === "true";
  const userId = req.user?.id;

  // Delete all tasks if doesnt have a parameter
  if (done === undefined) {
    await knex("tasks").where({ user_id: userId }).del();
    res.json({ message: "All tasks deleted" });
    return;
  }

  // Delete all tasks by status
  await knex("tasks").where({ done, user_id: req.user?.id }).del();

  const status = done ? "done" : "to-do";

  res.json({ message: `All ${status} tasks deleted` });
  return;
};

// Reorder tasks in bulk (drag-and-drop)
export const reorderTasks = async (req: Request, res: Response) => {
  const newOrder = req.body.newOrder;
  const done = String(req.body.done) === "true";

  if (!Array.isArray(newOrder)) {
    res.status(400).json({ error: "The body should be an array of tasks" });
    return;
  }

  const trx = await knex.transaction();

  try {
    for (const task of newOrder) {
      // Validate input
      if (typeof task.id !== "number" || typeof task.position !== "number") {
        await trx.rollback();
        res.status(400).json({
          error: "Each task should have an id(number) and a position(number)",
        });
        return;
      }

      // Update task position
      await trx("tasks")
        .where({ id: task.id })
        .andWhere("done", done)
        .update({ position: task.position });
    }

    await trx.commit();

    res.status(200).json({ message: "Tasks re-ordered successfully" });
    return;
  } catch (err) {
    await trx.rollback();
    console.error("Error reordering tasks:", err);
    res.status(500).json({ error: "Internal error reordering tasks" });
    return;
  }
};
