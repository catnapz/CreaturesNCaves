import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { UserManager, SignoutResponse } from "oidc-client";
import { createNotification } from "../../layout/notifications/notifications";

interface LogoutCallbackProps {
  userManager: UserManager;
  successCallback: (resp: void | SignoutResponse) => void;
  errorCallback: (error: Error) => void;
  children?: React.ReactNode;

}
export const LogoutCallback = (props: LogoutCallbackProps) => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    props.userManager.signoutRedirect()
      .then((resp: void | SignoutResponse) => {
        onRedirectSuccess(resp);
      })
      .catch(error => {
        onRedirectError(error);
      });
  }, []);
  
  const onRedirectSuccess = (resp: void | SignoutResponse) => {
    createNotification(dispatch, "Logged out successfully", "success");
    props.successCallback(resp);
  };

  const onRedirectError = (error: Error) => {
    createNotification(dispatch, "Logged out failed", "error");
    props.errorCallback(error);
  }

  return <>{props.children}</>;
};