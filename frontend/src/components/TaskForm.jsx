import { useState, useEffect } from "react";
import "../styles/TaskForm.css";

export default function TaskForm({ onSubmit, initialTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [formError, setFormError] = useState(null);

  const [prevInitialTask, setPrevInitialTask] = useState(initialTask);
  if (initialTask !== prevInitialTask) {
    setPrevInitialTask(initialTask);
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setPriority(initialTask.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setFormError("Title is required.");
      return;
    }
    setFormError(null);
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
    })
      .then(() => {
        if (!initialTask) {
          setTitle("");
          setDescription("");
          setPriority("medium");
        }
      })
      .catch((err) => setFormError(err.message));
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {formError && <p className="form-error">{formError}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <div className="task-form-actions">
        <button type="submit">
          {initialTask ? "Save Changes" : "Add Task"}
        </button>
        {initialTask && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
