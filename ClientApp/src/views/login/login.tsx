import React, {useEffect} from "react";
import {Container} from "react-bootstrap";
import {useQuery} from "@apollo/client";
import {useNavigate} from "react-router-dom";

import {useIsAuthenticated} from "../../auth";
import {TEST_REMOVE_BEFORE_GIT} from "../../api/gql/user";
import {Divider} from "../../components";

import {GoogleButton, LoginForm} from "./components";
import "./login.scss";

const Login = () => {
  const {data} = useQuery(TEST_REMOVE_BEFORE_GIT);

  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const goToSignUpView = () => navigate("/sign-up");

  return (
    <Container className="cnc-login--container">
      <div>
        Need an account? Sign up{" "}
        <strong className="cnc-login--sign-up-link" onClick={goToSignUpView}>
          here
        </strong>
        !
      </div>
      <LoginForm/>
      <Divider className="cnc-login--divider"> Or </Divider>
      <GoogleButton/>
    </Container>
  );
};

export default Login;
