import { Router } from "express";
import {
  getTasks,
  addTask,
  deleteAllTasks,
  updateTask,
  deleteTask,
  reorderTasks,
} from "../controllers/taskController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.get("/tasks", getTasks);
router.post("/tasks", addTask);
router.patch("/tasks/:taskId", updateTask);
router.delete("/tasks/:taskId", deleteTask);
router.delete("/tasks", deleteAllTasks);
router.put("/tasks/reorder", reorderTasks);

export default router;
