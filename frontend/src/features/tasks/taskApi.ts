import axiosInstance from "../../api/axiosInstance";
import type{
  Task,
  AddTaskPayload,
  UpdateTaskPayload,
  ApiResponse,
  TaskResult,
  TasksListResult,
} from "./task.types";

export const getAllTasks = async (
  page = 1,
  limit = 6,
  status?: string
): Promise<TasksListResult> => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (status) params.append("status", status);

  const response = await axiosInstance.get<ApiResponse<TasksListResult>>(
    `/tasks/fetch-all-tasks?${params.toString()}`
  );
  return response.data.data;
};

export const addTask = async (payload: AddTaskPayload): Promise<Task> => {
  const response = await axiosInstance.post<ApiResponse<TaskResult>>(
    "/tasks/add-task",
    payload
  );
  return response.data.data.task;
};

export const updateTask = async (
  taskId: string,
  payload: UpdateTaskPayload
): Promise<Task> => {
  const response = await axiosInstance.patch<ApiResponse<TaskResult>>(
    `/tasks/update-task/${taskId}`,
    payload
  );
  return response.data.data.task;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await axiosInstance.delete(`/tasks/delete-task/${taskId}`);
};