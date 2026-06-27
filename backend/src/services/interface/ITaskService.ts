import { AddTaskDto } from "../../dto/task.dto";
import { TaskResultDto } from "../../dto/task.response.dto";

export interface ITaskService {
  addTask(dto: AddTaskDto): Promise<TaskResultDto>;
}
