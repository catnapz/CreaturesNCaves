import React from "react";

import { Button, FAIcon } from "../../../../components";
import { AuthService } from "../../../../auth";

import "./google-button.scss";

const GoogleButton = () => (
  <Button
    className="cnc-login--button cnc-login--google-button"
    onClick={AuthService.signInViaGoogle}
  >
    <FAIcon icon={["fab", "google"]} /> Login with Google
  </Button>
);

export default GoogleButton;
