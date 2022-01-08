import React from "react";

import { Button, FAIcon } from "../../../../components";
import { AuthService } from "../../../../auth";

import "./google-button.scss";

const GoogleButton = () => (
  <Button
    className="cnc-sign-up--button cnc-sign-up--google-button"
    onClick={AuthService.signInViaGoogle}
  >
    <FAIcon icon={["fab", "google"]} /> Sign up via Google
  </Button>
);

export default GoogleButton;
