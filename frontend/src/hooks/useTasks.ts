import { useState, useEffect, useCallback } from "react";
import type { Task, AddTaskPayload, UpdateTaskPayload } from "../features/tasks/task.types";
import {
  getAllTasks,
  addTask as addTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from "../features/tasks/taskApi";
import { useAppSelector } from "./useAppSelector";
import { connectSocket, disconnectSocket, getSocket } from "../utils/socket";

const PAGE_SIZE = 6;

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Pending" | "In-Progress" | "Completed"
  >("All");

  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const fetchTasks = useCallback(
    async (targetPage: number = page, filter = statusFilter) => {
      setLoading(true);
      setError(null);
      try {
        const result = await getAllTasks(
          targetPage,
          PAGE_SIZE,
          filter === "All" ? undefined : filter
        );
        setTasks(result.tasks);
        setTotal(result.total);
        setPage(result.page);
      } catch {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    },
    [page, statusFilter]
  );

  useEffect(() => {
    void fetchTasks(1, statusFilter);
  }, [statusFilter]);

  // ── socket setup ──
  useEffect(() => {
    if (!accessToken) return;

    connectSocket(accessToken);
    const socket = getSocket();

    socket?.on("task-added", (newTask: Task) => {
      setTasks((prev) => [newTask, ...prev]);
      setTotal((prev) => prev + 1);
    });

    socket?.on("task-updated", (updatedTask: Task) => {
      setTasks((prev) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );
    });

    socket?.on("task-deleted", (deletedTaskId: string) => {
      setTasks((prev) => prev.filter((t) => t._id !== deletedTaskId));
      setTotal((prev) => prev - 1);
    });

    return () => {
      disconnectSocket();
    };
  }, [accessToken]);

  const goToPage = (targetPage: number) => {
    void fetchTasks(targetPage, statusFilter);
  };

  const changeFilter = (filter: "All" | "Pending" | "In-Progress" | "Completed") => {
    setStatusFilter(filter);
  };

  const createTask = async (payload: AddTaskPayload) => {
    await addTaskApi(payload);
    void fetchTasks(1, statusFilter);
  };

  const editTask = async (taskId: string, payload: UpdateTaskPayload) => {
    const updated = await updateTaskApi(taskId, payload);
    setTasks((prev) => prev.map((t) => (t._id === taskId ? updated : t)));
  };

  const removeTask = async (taskId: string) => {
    await deleteTaskApi(taskId);
    void fetchTasks(page, statusFilter);
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const stats = {
    total,
    pending: tasks.filter((t) => t.status === "Pending").length,
    inProgress: tasks.filter((t) => t.status === "In-Progress").length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    overdue: tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Completed"
    ).length,
  };

  return {
    tasks,
    loading,
    error,
    page,
    totalPages,
    statusFilter,
    stats,
    createTask,
    editTask,
    removeTask,
    goToPage,
    changeFilter,
    refetch: fetchTasks,
  };
};