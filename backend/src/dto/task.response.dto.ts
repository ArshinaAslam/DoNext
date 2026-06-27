export interface TaskResponseDto {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "In-Progress" | "Completed";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskResultDto {
  task: TaskResponseDto;
}
