import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "./auth-store.slice";


export const LogoutMenu = () => {
  const dispatch = useDispatch();
  
  return (
    <>
      <div>
        <h1> Logout? </h1>
          <button onClick={() => dispatch(signOut())}>Yes</button>
          <button onClick={() => window.location.href = '/'}>No</button>
      </div>
    </>
  );
};
