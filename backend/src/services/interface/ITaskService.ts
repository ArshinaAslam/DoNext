import { AddTaskDto, GetAllTasksDto, UpdateTaskDto } from "../../dto/task.dto";
import { GetTasksResultDto, TaskResultDto } from "../../dto/task.response.dto";

export interface ITaskService {
  addTask(dto: AddTaskDto, userId: string): Promise<TaskResultDto>;
  updateTask(taskId: string, dto: UpdateTaskDto,userId: string): Promise<TaskResultDto>;
 deleteTask(taskId: string, userId: string): Promise<void>;
  getAllTasks(dto: GetAllTasksDto): Promise<GetTasksResultDto>;
}
