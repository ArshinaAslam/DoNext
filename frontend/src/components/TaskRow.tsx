import type{ Task } from "../features/tasks/task.types";

interface TaskRowProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStart: (taskId: string) => void;
}

const TaskRow = ({ task, onEdit, onDelete, onStart }: TaskRowProps) => {
  return (
    <div className="task-row">
      <div className="task-row-main">
        <span className={`status-dot dot-${task.status.toLowerCase().replace(" ", "-")}`} />
        <div>
          <p className="task-row-title">{task.title}</p>
          {task.description && <p className="task-row-desc">{task.description}</p>}
        </div>
      </div>
      <div className="task-row-meta">
        {task.dueDate && (
          <span className="task-row-due">{new Date(task.dueDate).toLocaleDateString()}</span>
        )}
        <span className="status-pill">{task.status}</span>
      </div>
      <div className="task-row-actions">
        {task.status === "Pending" && (
          <button className="start-btn" onClick={() => onStart(task._id)}>
            Start
          </button>
        )}
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskRow;