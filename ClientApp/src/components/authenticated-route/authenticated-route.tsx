import React, { ReactNode } from "react";

import { useIsAuthenticated } from "../../auth";
import { useHistory } from "react-router";

export type ProtectedProps = {
  children?: ReactNode
}

export const Protected = (props: ProtectedProps) => {
  const isAuthenticated = useIsAuthenticated();
  const history = useHistory();

  if (!isAuthenticated) history.replace("/login");

  return <>{props.children}</>;
};

export default Protected;
