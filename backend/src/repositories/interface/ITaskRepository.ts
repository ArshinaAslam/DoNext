import { FilterQuery } from "mongoose";
import { ITask } from "../../models/Task";

export interface ITaskRepository {
  createTask(data: Partial<ITask>): Promise<ITask>;
  updateTaskById(taskId: string, updateData: Partial<ITask>): Promise<ITask | null>;
  deleteTaskById(taskId: string): Promise<ITask | null>;
  findByTaskId(taskId: string): Promise<ITask | null>;
  findAllTasks(
    filter: FilterQuery<ITask>,
    page: number,
    limit: number
  ): Promise<{ data: ITask[]; total: number }>;
}
