import { useState, useRef, useEffect, useLayoutEffect } from "react";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

const numOfClones = 3;

export default function TaskList({ tasks, onToggle }) {
  const trackRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [index, setIndex] = useState(numOfClones);
  const [animate, setAnimate] = useState(true);

  const isloopEnabled = tasks.length > numOfClones;
  const listItems = isloopEnabled
    ? [...tasks.slice(-numOfClones), ...tasks, ...tasks.slice(0, numOfClones)]
    : tasks;

  const [prevTasksLength, setPrevTasksLength] = useState(tasks.length);
  if (tasks.length !== prevTasksLength) {
    setPrevTasksLength(tasks.length);
    setIndex(numOfClones);
  }

  useLayoutEffect(() => {
    function measureSlideWidth() {
      const slide = trackRef.current?.firstChild;
      if (slide) {
        setSlideWidth(slide.getBoundingClientRect().width);
      }
    }
    measureSlideWidth();
    window.addEventListener("resize", measureSlideWidth);
    return () => window.removeEventListener("resize", measureSlideWidth);
  }, [listItems.length]);

  useEffect(() => {
    if (!animate) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
        });
      });
    }
  }, [animate]);

  const goNext = () => setIndex((i) => i + 1);
  const goPrev = () => setIndex((i) => i - 1);

  const handleTransitionEnd = () => {
    if (!isloopEnabled) return;
    if (index >= tasks.length + numOfClones) {
      setAnimate(false);
      setIndex(numOfClones);
    } else if (index < numOfClones) {
      setAnimate(false);
      setIndex(tasks.length + numOfClones - 1);
    }
  };

  if (tasks.length === 0) {
    return <p className="task-list-empty">No tasks yet.</p>;
  }

  return (
    <div className="task-list-container">
      <div
        className="task-list-track"
        ref={trackRef}
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(-${index * slideWidth}px)`,
          transition: animate
            ? "transform 0.4s cubic-bezier(.4,0,.2,1)"
            : "none",
        }}
      >
        {listItems.map((task, i) => (
          <div className="task-list-slide" key={`${task.id}-${i}`}>
            <TaskItem task={task} onToggle={onToggle} />
          </div>
        ))}
      </div>
      {isloopEnabled && (
        <div className="task-list-controls">
          <button onClick={goPrev}>Prev</button>
          <button onClick={goNext}>Next</button>
        </div>
      )}
    </div>
  );
}
