import React from "react";
import { TaskInterface } from "./TaskList";

interface Props {
  task: TaskInterface;
}

const TaskComponent = ({ task }: Props): JSX.Element => {
  return (
    <>
      <div key={task.createdTask.toString()}>
        {task.taskContent} - {task.createdTask.toString()}
      </div>
      <input value={task.taskContent} type="checkbox" />
      <span>{task.taskContent}</span>
    </>
  );
};

export default TaskComponent;
