import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router";

import { useIsAuthenticated } from "../../auth";
import { TEST_REMOVE_BEFORE_GIT } from "../../api/gql/user";
import { Divider } from "../../components";

import { GoogleButton, LoginForm } from "./components";
import "./login.scss";

const Login = () => {
  const { data } = useQuery(TEST_REMOVE_BEFORE_GIT);

  const isAuthenticated = useIsAuthenticated();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) history.push("/");
  }, [isAuthenticated, history]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const goToSignUpView = () => history.push("/sign-up");

  return (
    <Container className="cnc-login--container">
      <div>
        Need an account? Sign up{" "}
        <strong className="cnc-login--sign-up-link" onClick={goToSignUpView}>
          here
        </strong>
        !
      </div>
      <LoginForm />
      <Divider className="cnc-login--divider"> Or </Divider>
      <GoogleButton />
    </Container>
  );
};

export default Login;
