export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "In-Progress" | "Completed";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddTaskPayload {
  title: string;
  description: string;
  dueDate?: string;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: "Pending" | "In-Progress" | "Completed";
  dueDate?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface TaskResult {
  task: Task;
}

export interface TasksListResult {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
}