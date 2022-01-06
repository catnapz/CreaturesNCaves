import React, {ReactNode} from "react";

import {useIsAuthenticated} from "../../auth";
import {Navigate} from "react-router-dom";

export type ProtectedProps = {
  children?: ReactNode
}

export const Protected = (props: ProtectedProps) => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return (
      <Navigate replace to={"/login"}/>
    )
  }

  return <>{props.children}</>;
};

export default Protected;
