import TaskItem from "./TaskItem";

export default function TaskList({ tasks }) {
  return (
    <div className="task-list-container">
      <div className="task-list-track">
        {tasks.map((task) => (
          <div className="task-list-slide">
            <TaskItem task={task} />
          </div>
        ))}
      </div>
    </div>
  );
}
