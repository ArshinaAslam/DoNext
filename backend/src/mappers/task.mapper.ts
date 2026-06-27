import { ITask } from "../models/Task";
import { TaskResponseDto } from "../dto/task.response.dto";

export class TaskMapper {
  static toResponseDto(task: ITask): TaskResponseDto {
    return {
      _id: String(task._id),
      title: task.title,
      description: task.description,
      status: task.status,
      ...(task.dueDate && { dueDate: new Date(task.dueDate).toISOString() }),
      createdAt: new Date(task.createdAt).toISOString(),
      updatedAt: new Date(task.updatedAt).toISOString(),
    };
  }

  static toResponseDtoList(tasks: ITask[]): TaskResponseDto[] {
    return tasks.map((t) => TaskMapper.toResponseDto(t));
  }
}
