import React, { useEffect } from "react";
import { UserManager, User, SignoutResponse } from "oidc-client";

interface LogoutCallbackProps {
  userManager: UserManager;
  successCallback: (resp: void | SignoutResponse) => void;
  errorCallback: (error: Error) => void;
  children?: React.ReactNode;

}
export const LogoutCallback = (props: LogoutCallbackProps) => {
  
  useEffect(() => {
    props.userManager.signoutCallback()
      .then((resp: void | SignoutResponse) => {
        onRedirectSuccess(resp);
      })
      .catch(error => {
        onRedirectError(error);
      });
  }, []);
  
  const onRedirectSuccess = (resp: void | SignoutResponse) => {
    props.successCallback(resp);
  };

  const onRedirectError = (error: Error) => {
    props.errorCallback(error);
  }

  return <>{props.children}</>;
};