import React from "react";
import { AuthService } from "../../../../auth/auth-service";
import { StyledFirebaseAuth } from "react-firebaseui";
import { Card } from "@material-ui/core";
import "./login.scss";

const authService = new AuthService();

export const LoginMenu = () => {
  return (
    <Card className={"login-menu"}>
      <div>
        <h1>Please Sign-in!</h1>
        <small>Signing in for the first time will create an account :)</small>
        <StyledFirebaseAuth 
          uiConfig={authService.getUiConfig()} 
          firebaseAuth={authService.getFirebaseAuth()}
        />
      </div>
    </Card>
  )
}