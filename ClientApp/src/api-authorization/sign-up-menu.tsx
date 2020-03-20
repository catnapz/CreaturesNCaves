import React from "react";

export const SignUpMenu = () => {
  return (
    <>
      <div>
        <h1> Sign Up </h1>
        <form action="/Account/Register" method="post">
          <label>Username:
            <input type="text" name="username" placeholder="Username" required/>
          </label>
          <br/>
          <label>Email:
            <input type="text" name="email" placeholder="Password" required/>
          </label>
          <br/>
          <label>Password:
            <input type="password" name="password" placeholder="Password" required/>
          </label>
          <br/>
          <label>Confirm Password:
            <input type="password" name="confirmPassword" placeholder="Confirm password" required/>
          </label>
          <br/>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};
