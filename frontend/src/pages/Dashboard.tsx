import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useToast } from "../hooks/useToast";
import StatCard from "../components/StatCard";
import StatusChart from "../components/StatusChart";
import AddTaskModal from "../components/AddTaskModal";
import Toast from "../components/Toast";
import type{ AddTaskPayload } from "../features/tasks/task.types";

const Dashboard = () => {
  const { stats, createTask } = useTasks();
  const [showAddModal, setShowAddModal] = useState(false);
  const { message, showToast, clearToast } = useToast();

  const handleAdd = async (payload: AddTaskPayload) => {
    await createTask(payload);
    setShowAddModal(false);
    showToast("Task added successfully");
  };

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>Overview</h1>
        <button className="primary-btn" onClick={() => setShowAddModal(true)}>
          + Add Task
        </button>
      </div>

      <div className="stat-grid">
        <StatCard label="Pending" value={stats.pending} accentClass="accent-amber" />
        <StatCard label="In Progress" value={stats.inProgress} accentClass="accent-blue" />
        <StatCard label="Completed" value={stats.completed} accentClass="accent-sage" />
        <StatCard label="Overdue" value={stats.overdue} accentClass="accent-red" />
      </div>

      <div className="chart-panel">
        <h2>Status breakdown</h2>
        <StatusChart
          pending={stats.pending}
          inProgress={stats.inProgress}
          completed={stats.completed}
        />
      </div>

      {showAddModal && (
        <AddTaskModal onSubmit={handleAdd} onClose={() => setShowAddModal(false)} />
      )}

      {message && <Toast message={message} onClose={clearToast} />}
    </div>
  );
};

export default Dashboard;