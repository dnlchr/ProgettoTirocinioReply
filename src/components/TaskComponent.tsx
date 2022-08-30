import React from "react";
import styled from "styled-components";
import { TaskInterface } from "./TaskList";
import { Trash3 } from "react-bootstrap-icons";

interface Props {
  task: TaskInterface;
}

const TaskComponent = ({ task }: Props): JSX.Element => {
  return (
    <TaskWrapper>
      <InputSpan>
        <input value={task.taskContent} type="checkbox" />
        <span>{task.taskContent}</span>
      </InputSpan>
      <TrashButton>
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
