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

  // timeout per non aggiornare le liste dei task ad ogni tasto digitato, ma solo dopo che per un certo lasso di tempo non viene digitato altro
  const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timeout>();

  const taskChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value); // lo stato locale lo aggiorniamo ad ogni digitazione comunque, in modo che si veda sempre aggiornato a video

    // ogni volta che digitiamo una nuova lettera però resettiamo il nostro timer
    // controlliamo se esiste prima di farlo perché altrimenti la prima volta cercheremmo di eliminare qualcosa che non esiste, creando un errore
    if (timeoutRef) clearTimeout(timeoutRef);

    // creiamo un nuovo timeout, che poi mettiamo in timeoutRef, di 500ms
    const newTimeout = setTimeout(() => {
      // quando il timeout raggiunge i 500ms, allora lanciamo la funzione handleChangeTask
      handleChangeTask(task, event.target.value);
    }, 500);
    setTimeoutRef(newTimeout);
  };

  const handleLeaveFocus = () => {
    // quando si perde il focus, SOLO per i task che sono newlyCreated e che non hanno nessun contenuto, eliminiamo il task vuoto
    if (task.isNewlyCreated && taskName === "") deleteTask(task);
  };

  return (
    <TaskWrapper>
      <InputSpan>
        <input
          value={String(task.createdTask)}
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => markAsCompletedOrNot(task)} // onChange invece che onClick per evitare warning
        />
        <InputTask
          type="text"
          value={taskName}
          onChange={taskChangeHandler}
          placeholder={"Write your task..."} // placeholder che viene mostrato quando il task è vuoto
          autoFocus={task.isNewlyCreated} // se il task è segnato come isNewlyCreated, vogliamo che sia focused appena viene montato
          onBlur={handleLeaveFocus} // onBlur viene chiamato quando viene cliccato al di fuori dell'input, e si perde il focus
        />
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
  width: 100%;

  &:focus {
    color: white;
    background: black;
    font-size: 20px;
  }
`;

let InputSpan = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

let TrashButton = styled.button`
  border: none;
  outline: none;
  background: none;

  // questi stili permettono di mostrare una interazione all'utente quando mette il mouse sopra ad un bottone
  &:hover {
    cursor: pointer;
  }
`;

export default TaskComponent;
