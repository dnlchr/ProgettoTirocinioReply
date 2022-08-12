import { useState } from "react";
import styled from "styled-components";
import { PlusCircleFill, Trash3 } from "react-bootstrap-icons";
import TaskComponent from "./TaskComponent";

export interface TaskInterface {
  taskContent: string;
  isCompleted: boolean;
  createdTask: Date;
  completedTask: Date | null;
}

export interface TaskListsInterface {
  tasksToBeDone: TaskInterface[];
  tasksCompleted: TaskInterface[];
}

const DEFAULT_TASK_LISTS: TaskListsInterface = {
  tasksToBeDone: [
    {
      taskContent: "fare la spesa",
      isCompleted: false,
      createdTask: new Date("2022-08-11T03:24:00"),
      completedTask: null,
    },
  ],
  tasksCompleted: [
    {
      taskContent: "andare al mare",
      isCompleted: true,
      createdTask: new Date("2022-06-11T03:24:00"),
      completedTask: new Date("2022-06-25T03:24:00"),
    },
  ],
};

type Props = {};

const TaskList = (props: Props): JSX.Element => {
  const [taskLists, setTaskLists] =
    useState<TaskListsInterface>(DEFAULT_TASK_LISTS);

  const addNewTask = (newTask: TaskInterface) => {
    setTaskLists((oldTaskLists) => {
      const tasksToBeDone = [newTask, ...oldTaskLists.tasksToBeDone];

      return {
        tasksToBeDone,
        tasksCompleted: oldTaskLists.tasksCompleted,
      };
    });
  };

  // const deleteTask = (task: Task, currentTaskList: TaskLists) => {
  // cercare ed eliminare task da currentTaskList.tasksToBeDone o currentTaskList.tasksCompleted, a seconda del task che riceviamo in input
  //};

  return (
    <>
      <TitoloDiv>Your tasks</TitoloDiv>
      <Bottone>
        <PlusCircleFill size={25}></PlusCircleFill>
      </Bottone>
      {taskLists.tasksToBeDone.map((_: TaskInterface) => (
        <TaskComponent task={_} />
      ))}
      <Trash3> </Trash3>
      <BottoneTask> hide completed tasks </BottoneTask>
      {taskLists.tasksCompleted.map((_: TaskInterface) => (
        <TaskComponent task={_} />
      ))}
      <div>YOUR NOTES</div>
    </>
  );
};

let TitoloDiv = styled.text`
  font-family: "Big Caslon";
  color: black;
  font-size: 20px;
  text-decoration: underline;
  letter-spacing: 3px;
  word-spacing: 9px;
  font-weight: lighter;
  margin-bottom: 90%;
  margin-right: 5%;
`;

let Bottone = styled.button`
  border: none;
  color: grey;
  outline: none;
  background: none;
  font-size: 30px;
`;

let BottoneTask = styled.button`
  border: none;
  color: grey;
  outline: none;
  background: none;
  font-size: 20px;
`;

export default TaskList;
