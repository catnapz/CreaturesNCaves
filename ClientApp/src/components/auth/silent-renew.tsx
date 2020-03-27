import React from "react";
import { useDispatch } from "react-redux";
import { signInCallback } from "./auth-store.slice";

export const SilentRenew = () => {
  
  useDispatch()(signInCallback());
  return <span>loading</span>;
};