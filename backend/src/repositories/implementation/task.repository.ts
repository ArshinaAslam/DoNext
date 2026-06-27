import { injectable } from "tsyringe";
import { BaseRepository } from "../../common/repository/baseRepository";
import { ITask, TaskModel } from "../../models/Task";
import { ITaskRepository } from "../interface/ITaskRepository";

@injectable()
export class TaskRepository extends BaseRepository<ITask> implements ITaskRepository {
  constructor() {
    super(TaskModel);
  }

  createTask(data: Partial<ITask>): Promise<ITask> {
    return this.create(data);
  }
}
