import Greeting from "./components/Greeting";
import UserInput from "./components/UserInput";
import TaskList from "./components/TaskList";

function App() {
  return (
    <>
      <h1>
        <Greeting />
        <UserInput />
      </h1>
      <TaskList />
    </>
  );
}

export default App;
