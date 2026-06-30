import { useState, type FormEvent } from "react";
import type { AddTaskPayload } from "../features/tasks/task.types";
import { validateTask, type ValidationErrors } from "../utils/validation";

interface AddTaskModalProps {
  onSubmit: (payload: AddTaskPayload) => void;
  onClose: () => void;
}

const AddTaskModal = ({ onSubmit, onClose }: AddTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const errors = validateTask(title, description);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    onSubmit({ title: title.trim(), description: description.trim(), ...(dueDate && { dueDate }) });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form className="modal-card" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} noValidate>
        <h2>Add task</h2>

        <div className="form-field">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={fieldErrors.title ? "input-error" : ""}
          />
          {fieldErrors.title && <span className="field-error">{fieldErrors.title}</span>}
        </div>

        <div className="form-field">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={fieldErrors.description ? "input-error" : ""}
          />
          {fieldErrors.description && (
            <span className="field-error">{fieldErrors.description}</span>
          )}
        </div>

        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

        <div className="modal-actions">
          <button type="submit">Add task</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskModal;