import { ITask } from "../../models/Task";

export interface ITaskRepository {
  createTask(data: Partial<ITask>): Promise<ITask>;
}
