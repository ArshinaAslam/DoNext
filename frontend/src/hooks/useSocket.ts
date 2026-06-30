import { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { connectSocket, disconnectSocket, getSocket } from "../utils/socket";

interface UseSocketTaskHandlers {
  onTaskAdded?: (task: unknown) => void;
  onTaskUpdated?: (task: unknown) => void;
  onTaskDeleted?: (taskId: string) => void;
}

export const useSocket = (handlers: UseSocketTaskHandlers) => {
  const token = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!token) return;

    connectSocket(token);
    const socket = getSocket();

    if (handlers.onTaskAdded) {
      socket?.on("task-added", handlers.onTaskAdded);
    }
    if (handlers.onTaskUpdated) {
      socket?.on("task-updated", handlers.onTaskUpdated);
    }
    if (handlers.onTaskDeleted) {
      socket?.on("task-deleted", handlers.onTaskDeleted);
    }

    return () => {
      disconnectSocket();
    };
  }, [token]);
};