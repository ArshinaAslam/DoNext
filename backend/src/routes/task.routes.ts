import { Router } from "express";
import { container } from "tsyringe";
import { AsyncHandler } from "../middleware/asyncHandler";
import { TaskController } from "../controllers/task.controller";

const router = Router();

const taskController = container.resolve(TaskController);

router.post("/add-task", AsyncHandler(taskController.addTask.bind(taskController)));

export default router;
