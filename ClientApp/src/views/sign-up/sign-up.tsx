import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router";

import { useIsAuthenticated } from "../../auth";
import { Divider } from "../../components";

import { GoogleButton, SignUpForm } from "./components";
import "./sign-up.scss";

const SignUp = () => {
  const isAuthenticated = useIsAuthenticated();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) history.push("/");
  }, [isAuthenticated, history]);

  const goToLoginView = () => history.push("/login");

  return (
    <Container className="cnc-sign-up--container">
      <div>
        Already have an account? Login{" "}
        <strong className="cnc-sign-up--login-link" onClick={goToLoginView}>
          here
        </strong>
        !
      </div>
      <SignUpForm />
      <Divider className="cnc-sign-up--divider"> Or </Divider>
      <GoogleButton />
    </Container>
  );
};

export default SignUp;
