import type{ Task } from "../features/tasks/task.types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  return (
    <div className="kanban-card" draggable>
      <p className="kanban-card-title">{task.title}</p>
      {task.description && <p className="kanban-card-desc">{task.description}</p>}
      {task.dueDate && (
        <p className="kanban-card-due">{new Date(task.dueDate).toLocaleDateString()}</p>
      )}
      <div className="kanban-card-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;