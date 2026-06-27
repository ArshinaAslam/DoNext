import { inject, injectable } from "tsyringe";
import { DI_TYPES } from "../../common/di/types";
import { ITaskService } from "../interface/ITaskService";
import { AddTaskDto } from "../../dto/task.dto";
import { ITaskRepository } from "../../repositories/interface/ITaskRepository";
import { AppError } from "../../common/errors/appError";
import { MESSAGES } from "../../common/constants/statusMessages";
import { HttpStatus } from "../../common/enums/httpStatus.enum";
import logger from "../../utils/logger";
import { TaskMapper } from "../../mappers/task.mapper";
import { TaskResultDto } from "../../dto/task.response.dto";

@injectable()
export class TaskService implements ITaskService {
  constructor(
    @inject(DI_TYPES.TaskRepository)
    private readonly _taskRepository: ITaskRepository
  ) {}

  async addTask(dto: AddTaskDto): Promise<TaskResultDto> {
    if (!dto.title) {
      throw new AppError(MESSAGES.TASK.REQUIRED_FIELDS, HttpStatus.BAD_REQUEST);
    }
    const task = await this._taskRepository.createTask({
      title: dto.title,
      description: dto.description,
      ...(dto.dueDate && { dueDate: dto.dueDate }),
    });

    if (!task) {
      throw new AppError(MESSAGES.TASK.CREATE_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    logger.info("Task created successfully");

    return {
      task: TaskMapper.toResponseDto(task),
    };
  }
}
