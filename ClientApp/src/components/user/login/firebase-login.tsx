import React from "react";
import { AuthService } from "../../../auth/auth-service";
import { StyledFirebaseAuth } from "react-firebaseui";

const authService = new AuthService();

export const LoginMenu = () => {
  return (
    <StyledFirebaseAuth uiConfig={authService.getUiConfig()} firebaseAuth={authService.getFirebaseAuth()} />
  )
}