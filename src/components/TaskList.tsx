import { useState, useEffect } from "react";
import { cloneDeep, isEqual } from "lodash";
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
  createdTask: string;
  completedTask: string | null;
  isNewlyCreated: boolean;
}

export interface TaskListsInterface {
  tasksToBeDone: TaskInterface[];
  tasksCompleted: TaskInterface[];
}

const DEFAULT_TASK_LISTS: TaskListsInterface = {
  tasksToBeDone: [],
  tasksCompleted: [],
};

const LOCALSTORAGE_TASK_LISTS = "local task";
type Props = {};

const TaskList = (props: Props): JSX.Element => {
  const [taskLists, setTaskLists] = useState<TaskListsInterface>();

  useEffect(() => {
    let localStorageItems = localStorage.getItem(LOCALSTORAGE_TASK_LISTS); // prendiamo il valore (stringa) salvato in local storage

    if (localStorageItems) {
      // se esiste, ie. non è la prima volta che apriamo l'applicativo
      const localStorageObj = JSON.parse(localStorageItems); // trasformiamo la stringa in oggetto
      setTaskLists(localStorageObj); // la salviamo nello state
    } else {
      setTaskLists(DEFAULT_TASK_LISTS); // in caso contrario salviamo la lista di default (che sarà vuota)
    }
  }, []);

  useEffect(() => {
    if (taskLists)
      localStorage.setItem(LOCALSTORAGE_TASK_LISTS, JSON.stringify(taskLists));
  }, [taskLists]);

  const [showList, setShowList] = useState(true);
  const taskButtonHandler = () => {
    setShowList(!showList);
  };
  let taskText = showList ? "Hide completed tasks" : "Show completed tasks";

  const [showNotes, setShowNotes] = useState(true);
  const notesButtonHandler = () => {
    setShowNotes(!showNotes);
  };

  // quando clicchiamo sul bottone + aggiungiamo direttamente un task vuoto
  const addNewTask = () => {
    const newTask = {
      taskContent: "",
      isCompleted: false,
      createdTask: new Date().toISOString(),
      completedTask: null,
      isNewlyCreated: true, // ma lo marchiamo come nuovo per poterlo gestire in modo diverso dentro TaskComponent.tsx
    };

    setTaskLists((oldTaskLists) => {
      const tasksToBeDone = [newTask, ...(oldTaskLists?.tasksToBeDone ?? [])];

      return {
        tasksToBeDone,
        tasksCompleted: oldTaskLists?.tasksCompleted ?? [],
      };
    });
  };

  const deleteTask = (task: TaskInterface) => {
    setTaskLists((oldTaskLists) => {
      return {
        tasksToBeDone: deleteTaskFromList(
          task,
          oldTaskLists?.tasksToBeDone ?? []
        ),
        tasksCompleted: deleteTaskFromList(
          task,
          oldTaskLists?.tasksCompleted ?? []
        ),
      };
    });
  };

  const deleteTaskFromList = (
    task: TaskInterface,
    taskList: TaskInterface[]
  ) => {
    return taskList.filter((_) => _.createdTask !== task.createdTask);
  };

  const markAsCompletedOrNot = (task: TaskInterface) => {
    setTaskLists((oldTaskLists) => {
      return {
        tasksToBeDone: task.isCompleted
          ? [
              { ...task, isCompleted: !task.isCompleted },
              ...(oldTaskLists?.tasksToBeDone ?? []),
            ]
          : deleteTaskFromList(task, oldTaskLists?.tasksToBeDone ?? []),
        tasksCompleted: task.isCompleted
          ? deleteTaskFromList(task, oldTaskLists?.tasksCompleted ?? [])
          : [
              { ...task, isCompleted: !task.isCompleted },
              ...(oldTaskLists?.tasksCompleted ?? []),
            ],
      };
    });
  };

  const changeTask = (task: TaskInterface, newContent: string) => {
    setTaskLists((oldTaskLists) => {
      if (task.isCompleted) {
        const newTaskCompleted = cloneDeep(oldTaskLists?.tasksCompleted ?? []);
        const taskToBeModified = newTaskCompleted.find(
          (_) => _.createdTask === task.createdTask
        );

        if (taskToBeModified) {
          taskToBeModified.taskContent = newContent;
          taskToBeModified.isNewlyCreated = false; // quando modifichiamo il contenuto di un task ci segniamo anche che non è più nuovo
        }

        return {
          tasksToBeDone: oldTaskLists?.tasksToBeDone ?? [],
          tasksCompleted: newTaskCompleted,
        };
      } else {
        const newTaskToBeDone = cloneDeep(oldTaskLists?.tasksToBeDone ?? []);
        const taskToBeModified = newTaskToBeDone.find(
          (_) => _.createdTask === task.createdTask
        );

        if (taskToBeModified) {
          taskToBeModified.taskContent = newContent;
          taskToBeModified.isNewlyCreated = false; // quando modifichiamo il contenuto di un task ci segniamo anche che non è più nuovo
        }

        return {
          tasksToBeDone: newTaskToBeDone,
          tasksCompleted: oldTaskLists?.tasksCompleted ?? [],
        };
      }
    });
  };

  return (
    <>
      <TitleNotesWrapper>
        <TitleWrapper>
          <TitoloDiv>Your tasks</TitoloDiv>
          <Bottone onClick={addNewTask}>
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
          {taskLists ? (
            <>
              <TaskListWrapper>
                {taskLists.tasksToBeDone.map((_: TaskInterface) => (
                  <TaskComponent
                    task={_}
                    key={_.createdTask.toString()}
                    deleteTask={deleteTask}
                    markAsCompletedOrNot={markAsCompletedOrNot}
                    handleChangeTask={changeTask}
                  />
                ))}
              </TaskListWrapper>
              <ButtonWrapper>
                <BottoneTask onClick={taskButtonHandler}>
                  {taskText}
                </BottoneTask>
              </ButtonWrapper>
              {showList && (
                <TaskListWrapper>
                  {taskLists.tasksCompleted.map((_: TaskInterface) => (
                    <TaskComponent
                      task={_}
                      key={_.createdTask.toString()}
                      deleteTask={deleteTask}
                      markAsCompletedOrNot={markAsCompletedOrNot}
                      handleChangeTask={changeTask}
                    />
                  ))}
                </TaskListWrapper>
              )}
            </>
          ) : (
            "loading"
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

  // questi stili permettono di mostrare una interazione all'utente quando mette il mouse sopra ad un bottone
  &:hover {
    cursor: pointer;
  }
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

  // questi stili permettono di mostrare una interazione all'utente quando mette il mouse sopra ad un bottone
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
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
