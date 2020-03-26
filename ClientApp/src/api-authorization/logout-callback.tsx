import React from "react";
import { useDispatch } from "react-redux";
import { signoutRedirectCallback } from "./auth-store.slice";

export const LogoutCallback = () => {
  
  useDispatch()(signoutRedirectCallback());
  return <span>loading</span>;
};