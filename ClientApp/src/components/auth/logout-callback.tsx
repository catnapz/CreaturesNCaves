import React from "react";
import { useDispatch } from "react-redux";
import { signoutCallback } from "./auth-store.slice";

export const LogoutCallback = () => {
  
  useDispatch()(signoutCallback());
  return <span>loading</span>;
};