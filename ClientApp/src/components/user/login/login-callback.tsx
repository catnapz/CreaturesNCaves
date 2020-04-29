import React, { useEffect } from "react";
import { UserManager, User } from "oidc-client";

interface LoginCallbackProps {
  userManager: UserManager;
  successCallback: (user: User) => void;
  errorCallback: (error: Error) => void;
  children?: React.ReactNode;

}
export const LoginCallback = (props: LoginCallbackProps) => {
  
  const onRedirectSuccess = (user: User) => {
    props.successCallback(user);
  };

  const onRedirectError = (error: Error) => {
    props.errorCallback(error);
  }

  useEffect(() => {
    props.userManager.signinCallback()
      .then((user: User) => {
        onRedirectSuccess(user);
      })
      .catch(error => {
        onRedirectError(error);
      });
  }, []);
  
  return <>{props.children}</>;
};