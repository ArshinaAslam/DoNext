export interface AddTaskDto {
  title: string;
  description: string;
  dueDate?: Date;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: "Pending" | "In-Progress" | "Completed";
  dueDate?: Date;
}

export interface GetAllTasksDto {
  page: number;
  limit: number;
  userId: string;
  status?: "Pending" | "In-Progress" | "Completed";
}
