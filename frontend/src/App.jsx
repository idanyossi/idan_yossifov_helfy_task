import { useState, useEffect } from "react";
import { getAllTasks, toggleTaskCompletion, deleteTask } from "./services/api";
import TaskList from "./components/TaskList";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}

export default App;
