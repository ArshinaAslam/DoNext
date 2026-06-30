import { useState, useEffect, type FormEvent } from "react";
import type{ Task, AddTaskPayload, UpdateTaskPayload } from "../features/tasks/task.types";

interface TaskFormProps {
  editingTask: Task | null;
  onSubmit: (payload: AddTaskPayload | UpdateTaskPayload) => void;
  onCancel: () => void;
}

const TaskForm = ({ editingTask, onSubmit, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : "");
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  }, [editingTask]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      ...(dueDate && { dueDate }),
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <div className="form-actions">
        <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
        {editingTask && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;