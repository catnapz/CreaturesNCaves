import React from "react";
import { useDispatch } from "react-redux";
import { signIn } from "./auth-store.slice";


export const LoginMenu = () => {
  const dispatch = useDispatch();
  
  async function authorize() {
    const form: HTMLFormElement = document.getElementById('thisform') as HTMLFormElement; 
    await fetch('/Account/Login', {
      method: 'post',
      body: new FormData(form)
    });
  
    dispatch(signIn());
  }
  
  return (
    <>
      <div>
        <h1> Login </h1>
        <form id="thisform" action="/Account/Login" method="post">
          <label>Username:
            <input type="text" name="username" placeholder="Username" required/>
          </label>
          <br/>
          <label>Password:
            <input type="password" name="password" placeholder="Password" required/>
          </label>
          <br/>
          <label>Remember Me:
            <input
              name="rememberMe"
              type="checkbox" />
          </label>
          <br/>
          <button onClick={(e) => {e.preventDefault(); authorize()}}>Login</button>
        </form>
      </div>
    </>
  );
};
