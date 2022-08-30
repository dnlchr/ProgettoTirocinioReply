import { useState } from "react";
import styled from "styled-components";
import {
  PlusCircleFill,
  ArrowUpCircleFill,
  ArrowDownCircleFill,
} from "react-bootstrap-icons";
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
    {
      taskContent: "cucinare la cena",
      isCompleted: false,
      createdTask: new Date("2022-01-11T03:24:00"),
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
    {
      taskContent: "yoga",
      isCompleted: true,
      createdTask: new Date("2022-03-11T03:24:00"),
      completedTask: new Date("2022-04-25T03:24:00"),
    },
  ],
};

type Props = {};

const TaskList = (props: Props): JSX.Element => {
  const [taskLists, setTaskLists] =
    useState<TaskListsInterface>(DEFAULT_TASK_LISTS);

  const [showList, setShowList] = useState(true);
  const taskButtonHandler = () => {
    setShowList(!showList);
  };
  let taskText = showList ? "Hide completed tasks" : "Show completed tasks";

  const [showNotes, setShowNotes] = useState(true);
  const notesButtonHandler = () => {
    setShowNotes(!showNotes);
  };

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

  //const [isClicked, setisClicked] = useState(true);

  return (
    <>
      <TitleNotesWrapper>
        <TitleWrapper>
          <TitoloDiv>Your tasks</TitoloDiv>
          <Bottone>
            <PlusCircleFill size={20} />
          </Bottone>
        </TitleWrapper>
        <NotesWrapper>
          <NotesDiv>YOUR NOTES</NotesDiv>
          <Bottone onClick={notesButtonHandler}>
            {showNotes ? (
              <ArrowUpCircleFill size={20} />
            ) : (
              <ArrowDownCircleFill size={20} />
            )}
          </Bottone>
        </NotesWrapper>
      </TitleNotesWrapper>

      <Wrapper>
        <TaskAreaWrapper>
          <TaskListWrapper>
            {taskLists.tasksToBeDone.map((_: TaskInterface) => (
              <TaskComponent task={_} key={_.createdTask.toString()} />
            ))}
          </TaskListWrapper>
          <ButtonWrapper>
            <BottoneTask onClick={taskButtonHandler}> {taskText}</BottoneTask>
          </ButtonWrapper>
          {showList && (
            <TaskListWrapper>
              {taskLists.tasksCompleted.map((_: TaskInterface) => (
                <TaskComponent task={_} key={_.createdTask.toString()} />
              ))}
            </TaskListWrapper>
          )}
        </TaskAreaWrapper>

        {showNotes && (
          <TextAreaWrapper>
            <TextArea placeholder="Lorem ipsum bla bla..." />
          </TextAreaWrapper>
        )}
      </Wrapper>
    </>
  );
};

let Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  padding: 4px;
`;

let TitleNotesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  padding: 8px;
`;

let TitoloDiv = styled.text`
  font-family: "Big Caslon";
  color: black;
  font-size: 20px;
  text-decoration: underline;
  letter-spacing: 3px;
  word-spacing: 9px;
  font-weight: lighter;
`;

let Bottone = styled.button`
  border: none;
  color: black;
  outline: none;
  background: none;
  font-size: 10px;
`;

let BottoneTask = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border: none;
  color: grey;
  outline: none;
  background: none;
  font-size: 15px;
`;

let ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

let TaskListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  font-family: "Big Caslon";
  font-size: 17px;
  //flex-grow: 2;
  width: 100%;
`;

let TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

let NotesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
`;

let TaskAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  //flex-grow: 2;
  width: 100%;
`;

let TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 10px;
  //flex-grow: 1;
`;

let NotesDiv = styled.text`
  font-family: "Big Caslon";
  color: black;
  font-size: 17px;
  letter-spacing: 3px;
  word-spacing: 9px;
  font-weight: lighter;
  text-decoration: underline;
`;

let TextArea = styled.textarea`
  font-family: "Big Caslon";
  color: black;
  font-size: 13px;
  letter-spacing: 3px;
  word-spacing: 9px;
  font-weight: lighter;
  border-style: none;
  border-radius: 8px;
  padding: 8px;
  resize: none;
`;

export default TaskList;
