import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useIsAuthenticated } from "../../auth";
import { Divider } from "../../components";

import { GoogleButton, SignUpForm } from "./components";
import "./sign-up.scss";

const SignUp = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const goToLoginView = () => navigate("/login");

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
