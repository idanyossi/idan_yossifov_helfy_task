import "../styles/TaskItem.css";

export default function TaskItem({ task }) {
  return (
    <div
      className="task-item"
      style={{ "--priority-color": `var(--priority-${task.priority})` }}
    >
      <div className="task-item-header">
        <h3>{task.title}</h3>
        <span className={`priority ${task.priority}`}>{task.priority}</span>
      </div>
      <p>{task.description}</p>
      <p className="task-status">{task.completed ? "Completed" : "Pending"}</p>
    </div>
  );
}
