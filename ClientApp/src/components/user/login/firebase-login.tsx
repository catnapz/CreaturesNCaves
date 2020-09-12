import React from "react";
import { authService, uiConfig } from "../../../auth/auth-service";
import { StyledFirebaseAuth } from "react-firebaseui";

export const LoginMenu = () => {
  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={authService} />
  )
}