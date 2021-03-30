import React from "react";
import Counter from "./counter/counter";
import { Container } from "react-bootstrap";
import { Button } from "../../components";
import notify from "../../utilities/notifications/toasts";

const TestPage = () => {
  return (
    <Container>
      <Counter />
      <Button onClick={() => notify.success("Nat 20! ".repeat(10))}>
        Success Toast
      </Button>
      <Button onClick={() => notify.info("Hey! Listen! ".repeat(10))}>
        Info Toast
      </Button>
      <Button onClick={() => notify.warn("*grumble grumble* ".repeat(10))}>
        Warn Toast
      </Button>
      <Button onClick={() => notify.error("Uh oh! ".repeat(10))}>
        Error Toast
      </Button>
    </Container>
  );
};

export default TestPage;
