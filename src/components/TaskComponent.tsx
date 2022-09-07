import React, { useState } from "react";
import styled from "styled-components";
import { TaskInterface } from "./TaskList";
import { Trash3 } from "react-bootstrap-icons";

interface Props {
  task: TaskInterface;
  deleteTask: (task: TaskInterface) => void;
  markAsCompletedOrNot: (task: TaskInterface) => void;
  handleChangeTask: (task: TaskInterface, newValue: string) => void;
}

const TaskComponent = ({
  task,
  deleteTask,
  markAsCompletedOrNot,
  handleChangeTask,
}: Props): JSX.Element => {
  const [taskName, setTaskName] = useState(task.taskContent);

  const taskChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
    handleChangeTask(task, event.target.value);
  };

  return (
    <TaskWrapper>
      <InputSpan>
        <input
          value={String(task.createdTask)}
          type="checkbox"
          checked={task.isCompleted}
          onClick={() => markAsCompletedOrNot(task)}
        />
        <InputTask
          type="text"
          value={taskName}
          onChange={taskChangeHandler}
        ></InputTask>
      </InputSpan>

      <TrashButton onClick={() => deleteTask(task)}>
        <Trash3 />
      </TrashButton>
    </TaskWrapper>
  );
};

let TaskWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  //border-radius: 8px;
  padding: 8px;
  //box-shadow: 4px 4px 2px -2px gray;
  justify-content: space-between;
`;

let InputTask = styled.input`
  font-family: "Big Caslon";
  color: black;
  font-size: 20px;
  letter-spacing: 3px;
  word-spacing: 9px;
  font-weight: lighter;
  border: none;

  &:focus {
    color: white;
    background: black;
    font-size: 20px;
  }
`;

let InputSpan = styled.div`
  display: flex;
  gap: 10px;
`;

let TrashButton = styled.button`
  border: none;
  outline: none;
  background: none;
`;

export default TaskComponent;
