import { injectable } from "tsyringe";
import { BaseRepository } from "../../common/repository/baseRepository";
import { ITask, TaskModel } from "../../models/Task";
import { ITaskRepository } from "../interface/ITaskRepository";
import { FilterQuery } from "mongoose";

@injectable()
export class TaskRepository extends BaseRepository<ITask> implements ITaskRepository {
  constructor() {
    super(TaskModel);
  }

  async createTask(data: Partial<ITask>): Promise<ITask> {
    return this.create(data);
  }

  async updateTaskById(taskId: string, updateData: Partial<ITask>): Promise<ITask | null> {
    return this.update(taskId, updateData);
  }

  async findByTaskId(taskId: string): Promise<ITask | null> {
    return this.findById(taskId);
  }

  async deleteTaskById(taskId: string): Promise<ITask | null> {
    return this.delete(taskId);
  }

  async findAllTasks(
    filter: FilterQuery<ITask>,
    page: number,
    limit: number
  ): Promise<{ data: ITask[]; total: number }> {
    return this.findPaginated(filter, page, limit);
  }
}
