import type{ Task } from "../features/tasks/task.types";

interface TaskCard2Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStart: (taskId: string) => void;
  onComplete: (taskId: string) => void;
}

const TaskCard2 = ({ task, onEdit, onDelete, onStart, onComplete }: TaskCard2Props) => {
  return (
    <div className="task-grid-card">
      <div className="task-grid-card-top">
        <span className={`status-dot dot-${task.status.toLowerCase().replace(" ", "-")}`} />
        <span className="status-pill">{task.status}</span>
      </div>

      <h3 className="task-grid-card-title">{task.title}</h3>
      {task.description && <p className="task-grid-card-desc">{task.description}</p>}

      {task.dueDate && (
        <p className="task-grid-card-due">Due {new Date(task.dueDate).toLocaleDateString()}</p>
      )}

      <div className="task-grid-card-actions">
        {task.status === "Pending" && (
          <button className="start-btn" onClick={() => onStart(task._id)}>
            Start
          </button>
        )}
        {task.status === "In-Progress" && (
          <button className="complete-btn" onClick={() => onComplete(task._id)}>
            Complete
          </button>
        )}
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard2;