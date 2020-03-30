import React from "react";
import { UserManager } from "oidc-client";

export const LoginMenu = (props: {userManager: UserManager}) => {
  
  async function authorize(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    const form: HTMLFormElement = document.getElementById('thisform') as HTMLFormElement; 
    const resp = await fetch('/Account/Login', {
      method: 'post',
      body: new FormData(form)
    });
    if(resp.ok) props.userManager.signinRedirect();;
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
          <button onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {authorize(event)}}>Login</button>
        </form>
      </div>
    </>
  );
};
