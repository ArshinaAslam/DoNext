import { inject, injectable } from "tsyringe";
import { DI_TYPES } from "../common/di/types";
import { ITaskService } from "../services/interface/ITaskService";
import { Request, Response } from "express";
import logger from "../utils/logger";
import { HttpStatus } from "../common/enums/httpStatus.enum";
import { ApiResponse } from "../common/response/ApiResponse";
import { MESSAGES } from "../common/constants/statusMessages";
import { AddTaskDto } from "../dto/task.dto";

@injectable()
export class TaskController {
  constructor(
    @inject(DI_TYPES.TaskService)
    private readonly _taskService: ITaskService
  ) {}

  async addTask(req: Request, res: Response): Promise<Response> {
    logger.info("Add task request");
    const dto = req.body as AddTaskDto;

    const result = await this._taskService.addTask(dto);
    logger.info("Task added SUCCESS");

    return res
      .status(HttpStatus.CREATED)
      .json(ApiResponse.success({ task: result.task }, MESSAGES.TASK.CREATE_SUCCESS));
  }
}
