import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "../../auth";
import { Divider } from "../../components";
import { GoogleButton, LoginForm } from "./components";
import "./login.scss";

const Login = () => {

  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

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
      <LoginForm />
      <Divider className="cnc-login--divider"> Or </Divider>
      <GoogleButton />
    </Container>
  );
};

export default Login;
