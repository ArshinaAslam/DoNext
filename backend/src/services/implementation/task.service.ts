import { inject, injectable } from "tsyringe";
import { DI_TYPES } from "../../common/di/types";
import { ITaskService } from "../interface/ITaskService";
import { AddTaskDto, GetAllTasksDto, UpdateTaskDto } from "../../dto/task.dto";
import { ITaskRepository } from "../../repositories/interface/ITaskRepository";
import { AppError } from "../../common/errors/appError";
import { MESSAGES } from "../../common/constants/statusMessages";
import { HttpStatus } from "../../common/enums/httpStatus.enum";
import logger from "../../utils/logger";
import { TaskMapper } from "../../mappers/task.mapper";
import { GetTasksResultDto, TaskResultDto } from "../../dto/task.response.dto";
import { Types } from "mongoose";
import { getIO } from "../../config/socket";

@injectable()
export class TaskService implements ITaskService {
  constructor(
    @inject(DI_TYPES.TaskRepository)
    private readonly _taskRepository: ITaskRepository
  ) {}

  async addTask(dto: AddTaskDto, userId: string): Promise<TaskResultDto> {
    if (!dto.title) {
      throw new AppError(MESSAGES.TASK.REQUIRED_FIELDS, HttpStatus.BAD_REQUEST);
    }
    const task = await this._taskRepository.createTask({
      userId: new Types.ObjectId(userId),
      title: dto.title,
      description: dto.description,
      ...(dto.dueDate && { dueDate: dto.dueDate }),
    });

    if (!task) {
      throw new AppError(MESSAGES.TASK.CREATE_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    logger.info("Task created successfully");

   const responseTask = TaskMapper.toResponseDto(task);

  
  getIO().to(userId).emit("task-added", responseTask);

  return { task: responseTask };
  }

  async updateTask(taskId: string, dto: UpdateTaskDto,userId: string): Promise<TaskResultDto> {
    if (!taskId) {
      throw new AppError(MESSAGES.TASK.INVALID_ID, HttpStatus.BAD_REQUEST);
    }

    const existingTask = await this._taskRepository.findByTaskId(taskId);
    if (!existingTask) {
      throw new AppError(MESSAGES.TASK.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const updatedTask = await this._taskRepository.updateTaskById(taskId, {
      ...(dto.title && { title: dto.title }),
      ...(dto.description && { description: dto.description }),
      ...(dto.status && { status: dto.status }),
      ...(dto.dueDate && { dueDate: dto.dueDate }),
    });

    if (!updatedTask) {
      throw new AppError(MESSAGES.TASK.UPDATE_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    logger.info("Task updated successfully");
     const responseTask = TaskMapper.toResponseDto(updatedTask);

  getIO().to(userId).emit("task-updated", responseTask);

  return { task: responseTask };
  }

  async deleteTask(taskId: string, userId: string): Promise<void> {
    const existingTask = await this._taskRepository.findByTaskId(taskId);
    if (!existingTask) {
      throw new AppError(MESSAGES.TASK.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this._taskRepository.deleteTaskById(taskId);

    getIO().to(userId).emit("task-deleted", taskId);

  logger.info("Task deleted successfully");
  }

  async getAllTasks(dto: GetAllTasksDto): Promise<GetTasksResultDto> {
    const filter = {
      userId: dto.userId,
      ...(dto.status && { status: dto.status }),
    };

    const { data, total } = await this._taskRepository.findAllTasks(filter, dto.page, dto.limit);

    logger.info("Tasks fetched", { page: dto.page, limit: dto.limit, count: data.length });

    return {
      tasks: TaskMapper.toResponseDtoList(data),
      total,
      page: dto.page,
      limit: dto.limit,
    };
  }
}
