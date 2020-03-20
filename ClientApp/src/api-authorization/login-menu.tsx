import React from "react";

export const LoginMenu = () => {
  return (
    <>
      <div>
        <h1> Login </h1>
        <form action="/Account/Login" method="post">
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
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};
