import type{ Task } from "../features/tasks/task.types";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskList = ({ tasks, onEdit, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p>No tasks yet. Add one to get started.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;