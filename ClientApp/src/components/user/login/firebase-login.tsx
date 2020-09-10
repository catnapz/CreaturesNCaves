import React from "react";
import { firebaseAuth, uiConfig } from "../auth/firebase";
import { StyledFirebaseAuth } from "react-firebaseui";

export const LoginMenu = () => {
  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
  )
}