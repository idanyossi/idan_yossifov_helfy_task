import { useState, useEffect } from "react";
import {
  getAllTasks,
  toggleTaskCompletion,
  deleteTask,
  createTask,
  updateTask,
} from "./services/api";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const handleEditClick = (task) => setEditingTask(task);
  const handleCancelEdit = () => setEditingTask(null);

  useEffect(() => {
    getAllTasks()
      .then(setTasks)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = (id) => {
    toggleTaskCompletion(id)
      .then((updatedTask) => {
        setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
      })
      .catch((err) => setError(err.message));
  };

  const handleDelete = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
      })
      .catch((err) => setError(err.message));
  };

  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      return updateTask(editingTask.id, taskData).then((updated) => {
        setTasks((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t)),
        );
        setEditingTask(null);
      });
    }
    return createTask(taskData).then((newTask) => {
      setTasks((prev) => [...prev, newTask]);
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm
        onSubmit={handleFormSubmit}
        initialTask={editingTask}
        onCancel={handleCancelEdit}
      />
      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEditClick}
      />
    </div>
  );
}

export default App;
