import React from "react";
import { UserManager } from "oidc-client";
import { useApolloClient } from "@apollo/react-hooks";

export const LogoutMenu = (props: {userManager: UserManager}) => {
  const apolloClient = useApolloClient();

  function logout(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    
    apolloClient.resetStore();
    props.userManager.signoutRedirect();
  }

  return (
    <>
      <div>
        <h1> Logout? </h1>
          <button onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => logout(event)}>Yes</button>
          <button onClick={() => window.location.assign('/')}>No</button>
      </div>
    </>
  );
};
