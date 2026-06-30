import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useToast } from "../hooks/useToast";
import TaskCard2 from "../components/TaskCard2";
import TaskEditModal from "../components/TaskEditModal";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import Pagination from "../components/Pagination";
import StatusFilter from "../components/StatusFilter";
import type{ Task, UpdateTaskPayload } from "../features/tasks/task.types";

const MyTasks = () => {
  const {
    tasks,
    loading,
    error,
    page,
    totalPages,
    statusFilter,
    editTask,
    removeTask,
    goToPage,
    changeFilter,
  } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const { message, showToast, clearToast } = useToast();

  const handleStart = async (taskId: string) => {
    await editTask(taskId, { status: "In-Progress" });
    showToast("Task started");
  };

  const handleComplete = async (taskId: string) => {
    await editTask(taskId, { status: "Completed" });
    showToast("Task completed");
  };

  const handleUpdate = async (payload: UpdateTaskPayload) => {
    if (!editingTask) return;
    await editTask(editingTask._id, payload);
    setEditingTask(null);
    showToast("Task updated successfully");
  };

  const confirmDelete = async () => {
    if (!deletingTaskId) return;
    await removeTask(deletingTaskId);
    setDeletingTaskId(null);
    showToast("Task deleted");
  };

  return (
    <div className="dashboard-content">
      <h1>My Tasks</h1>

      <StatusFilter value={statusFilter} onChange={changeFilter} />

      {loading && <p className="board-loading">Loading tasks…</p>}
      {error && <p className="error-banner">{error}</p>}
      {!loading && tasks.length === 0 && <p className="board-loading">No tasks yet.</p>}

      <div className="task-grid">
        {tasks.map((task) => (
          <TaskCard2
            key={task._id}
            task={task}
            onEdit={setEditingTask}
            onDelete={setDeletingTaskId}
            onStart={handleStart}
            onComplete={handleComplete}
          />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />

      {editingTask && (
        <TaskEditModal
          task={editingTask}
          onSubmit={handleUpdate}
          onClose={() => setEditingTask(null)}
        />
      )}

      {deletingTaskId && (
        <ConfirmDialog
          title="Delete task?"
          message="This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setDeletingTaskId(null)}
        />
      )}

      {message && <Toast message={message} onClose={clearToast} />}
    </div>
  );
};

export default MyTasks;