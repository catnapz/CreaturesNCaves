import React, { useState } from "react";
import { UserManager } from "oidc-client";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from "@material-ui/core/FormHelperText";
import './account-form.scss';

interface inputFieldState {
  error: boolean;
  helperText: string;
}

interface passwordInputFieldState extends inputFieldState {
  showPassword?: boolean;
}

export const LoginMenu = (props: { userManager: UserManager }) => {

  const [usernameState, setUsernameState] = useState({ error: false, helperText: "Required" } as inputFieldState);
  const [passwordState, setPasswordState] = useState({ error: false, helperText: "Required" } as passwordInputFieldState);

  const handleClickShowPassword = () => {
    setPasswordState({ ...passwordState, showPassword: !passwordState.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const valid = (): boolean => {
    const usernameField: HTMLInputElement = document.getElementById('username-field') as HTMLInputElement;
    const passwordField: HTMLInputElement = document.getElementById('password-field') as HTMLInputElement;
    const usernameValid = usernameField.checkValidity();
    const passwordValid = passwordField.checkValidity();
    setUsernameState({ error: !usernameValid, helperText: usernameField.validationMessage || "Required"});
    setPasswordState({ error: !passwordValid, helperText: passwordField.validationMessage || "Required"});
    return usernameValid && passwordValid;
  }

  const handleOnChange = (input: string) => {
    const state: inputFieldState = {
      helperText: "Required",
      error: false
    }
    switch (input) {
      case "username":
        setUsernameState(state);
        break;

      case "password":
        setPasswordState(state);
        break;

      default:
        break;
    }
  }

  async function handleLoginButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    if (!valid()) return;

    const form: HTMLFormElement = document.getElementById('login-form') as HTMLFormElement;
    const resp = await fetch('/Account/Login', {
      method: 'post',
      body: new FormData(form)
    });
    if (resp.ok) props.userManager.signinRedirect();
  }

  return (
    <>
      <div>
        <h1> Login </h1>
        <form id="login-form" className="account-form" action="/Account/Login" method="post">

          <FormGroup id="login-form-group">
            <TextField
              id='username-field'
              required
              error={usernameState.error}
              helperText={usernameState.helperText}
              onChange={() => handleOnChange('username')}
              label="Username"
              name="username"
              variant="outlined"
            />

            <FormControl variant="outlined">
              <InputLabel 
                htmlFor="password" 
                error={passwordState.error}
              >
                Password *
              </InputLabel>

              <OutlinedInput
                required
                id="password-field"
                name="password"
                error={passwordState.error}
                type={passwordState.showPassword ? 'text' : 'password'}
                onChange={() => handleOnChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {passwordState.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={82}
              />
              <FormHelperText 
                id="password-field-helper-text"
                error={passwordState.error}
              >
                {passwordState.helperText}
              </FormHelperText>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                />}
              label="Remember Me"
            />

            <div id="button-container">
              <Button
                variant="contained"
                onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { handleLoginButtonClick(event) }}
                >
                Login
              </Button>
            </div>
          </FormGroup>
        </form>
      </div>
    </>
  );
};
