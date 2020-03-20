import React from "react";

function login(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
  console.log(event)
}

export const LoginMenu = () => {
  return (
    <>
      <div>
        <form action="/account/login" method="post">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" placeholder="username"/>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="password"/>
          <button type="submit">Log in</button>
        </form>
      </div>
    </>
  );
};
