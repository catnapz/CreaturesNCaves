import React from "react";
import { useDispatch } from "react-redux";
import { signinSilentCallback } from "./auth-store.slice";

export const SilentRenew = () => {
  
  useDispatch()(signinSilentCallback());
  return <span>loading</span>;
};