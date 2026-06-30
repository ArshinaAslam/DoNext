import { Router } from "express";
import { container } from "tsyringe";
import { AsyncHandler } from "../middleware/asyncHandler";
import { TaskController } from "../controllers/task.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

const taskController = container.resolve(TaskController);

router.post(
  "/add-task",
  authenticateToken,
  AsyncHandler(taskController.addTask.bind(taskController))
);
router.patch(
  "/update-task/:taskId",
  authenticateToken,
  AsyncHandler(taskController.updateTask.bind(taskController))
);
router.delete(
  "/delete-task/:taskId",
  authenticateToken,
  AsyncHandler(taskController.deleteTask.bind(taskController))
);
router.get(
  "/fetch-all-tasks",
  authenticateToken,
  AsyncHandler(taskController.getAllTask.bind(taskController))
);

export default router;
