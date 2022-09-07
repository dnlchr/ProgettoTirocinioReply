import styled from "styled-components";

import Greeting from "./components/Greeting";
import UserInput from "./components/UserInput";
import TaskList from "./components/TaskList";

function App() {
  return (
    <Container>
      <GreetingContainer>
        <Greeting />
        <UserInput />
      </GreetingContainer>
      <TaskList />
    </Container>
  );
}

const Container = styled.div`
  padding: 32px 64px;
`;

const GreetingContainer = styled.h1`
  margin-bottom: 32px;
`;

export default App;
