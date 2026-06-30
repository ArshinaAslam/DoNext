import { inject, injectable } from "tsyringe";
import { DI_TYPES } from "../common/di/types";
import { ITaskService } from "../services/interface/ITaskService";
import { Request, Response } from "express";
import logger from "../utils/logger";
import { HttpStatus } from "../common/enums/httpStatus.enum";
import { ApiResponse } from "../common/response/ApiResponse";
import { MESSAGES } from "../common/constants/statusMessages";
import { AddTaskDto, UpdateTaskDto } from "../dto/task.dto";
import { AuthRequest } from "../middleware/auth.middleware";

@injectable()
export class TaskController {
  constructor(
    @inject(DI_TYPES.TaskService)
    private readonly _taskService: ITaskService
  ) {}

  async addTask(req: AuthRequest, res: Response): Promise<Response> {
    logger.info("Add task request");
    const dto = req.body as AddTaskDto;
    const userId = req.userId as string;

    const result = await this._taskService.addTask(dto, userId);
    logger.info("Task added SUCCESS");

    return res
      .status(HttpStatus.CREATED)
      .json(ApiResponse.success({ task: result.task }, MESSAGES.TASK.CREATE_SUCCESS));
  }

  async updateTask(req: AuthRequest, res: Response): Promise<Response> {
    logger.info("Update task request");
    const userId = req.userId as string;

    const taskId = req.params.taskId as string;
    if (!taskId) {
      return res.status(HttpStatus.BAD_REQUEST).json(ApiResponse.error(MESSAGES.TASK.INVALID_ID));
    }

    const dto = req.body as UpdateTaskDto;

    const result = await this._taskService.updateTask(taskId, dto, userId);
    logger.info("Task updated success");

    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success(result, MESSAGES.TASK.UPDATE_SUCCESS));
  }

  async deleteTask(req: AuthRequest, res: Response): Promise<Response> {
    const taskId = req.params.taskId as string;
    const userId = req.userId as string;

    if (!taskId) {
      return res.status(HttpStatus.BAD_REQUEST).json(ApiResponse.error(MESSAGES.TASK.INVALID_ID));
    }

    await this._taskService.deleteTask(taskId, userId);
    return res.status(HttpStatus.OK).json(ApiResponse.success(null, MESSAGES.TASK.DELETE_SUCCESS));
  }

  async getAllTask(req: AuthRequest, res: Response): Promise<Response> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const status = req.query.status as "Pending" | "In-Progress" | "Completed";
    const userId = req.userId as string;

    logger.info("Fetch all tasks request", { page, limit });

    const result = await this._taskService.getAllTasks({
      page,
      limit,
      userId,
      ...(status && { status }),
    });

    return res
      .status(HttpStatus.OK)
      .json(ApiResponse.success(result, MESSAGES.TASK.FETCH_ALL_SUCCESS));
  }
}
