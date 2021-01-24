import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from "@material-ui/core/FormHelperText";
import '../account-form.scss';

interface inputFieldState {
  error: boolean;
  helperText: string;
}

interface passwordInputFieldState extends inputFieldState {
  showPassword?: boolean;
}

export const SignUpMenu = () => {

  const [usernameState, setUsernameState] = useState({ error: false, helperText: "Required" } as inputFieldState);
  const [emailState, setEmailState] = useState({ error: false, helperText: "Required" } as inputFieldState);
  const [passwordState, setPasswordState] = useState({ error: false, helperText: "Required" } as passwordInputFieldState);
  const [confirmPasswordState, setConfirmPasswordState] = useState({ error: false, helperText: "Required" } as passwordInputFieldState);

  const handleClickShowPassword = () => {
    setPasswordState({ ...passwordState, showPassword: !passwordState.showPassword });
  };

  const handleClickShowPasswordConfrimation = () => {
    setConfirmPasswordState({ ...confirmPasswordState, showPassword: !confirmPasswordState.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const valid = (): boolean => {
    const usernameField: HTMLInputElement = document.getElementById('username-field') as HTMLInputElement;
    const emailField: HTMLInputElement = document.getElementById('email-field') as HTMLInputElement;
    const passwordField: HTMLInputElement = document.getElementById('password-field') as HTMLInputElement;
    const confirmPasswordField: HTMLInputElement = document.getElementById('confirm-password-field') as HTMLInputElement;

    const usernameValid = usernameField.checkValidity();
    const emailValid = emailField.checkValidity();
    const passwordValid = passwordField.checkValidity();
    let confirmPasswordValid = confirmPasswordField.checkValidity();

    setUsernameState({ error: !usernameValid, helperText: usernameField.validationMessage || "Required"});
    setEmailState({ error: !passwordValid, helperText: emailField.validationMessage || "Required"});
    setPasswordState({ error: !passwordValid, helperText: passwordField.validationMessage || "Required"});
    
    if(confirmPasswordField.value !== passwordField.value) {
      confirmPasswordValid = false;
      setPasswordState({ error: true, helperText: "Passwords do not match"});
      setConfirmPasswordState({ error: true, helperText: "Passwords do not match"});
    } else {
      setConfirmPasswordState({ error: !passwordValid, helperText: passwordField.validationMessage || "Required"});
    }

    return usernameValid && passwordValid && emailValid && confirmPasswordValid;
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

      case "email":
        setEmailState(state);
        break;

      case "password":
        setPasswordState(state);
        break;

      case "confirmPassword":
        setConfirmPasswordState(state);
        break;

      default:
        break;
    }
  }

  async function handleSignupButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    if (!valid()) return;

    const form: HTMLFormElement = document.getElementById('signup-form') as HTMLFormElement;
    form.submit();
  }

  return (
    <>
      <div>
        <h1> Signup </h1>
        <form id="signup-form" className="account-form" action="/Account/Register" method="post">

          <FormGroup id="signup-form-group">

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

            <TextField
              id='email-field'
              required
              error={emailState.error}
              helperText={emailState.helperText}
              onChange={() => handleOnChange('email')}
              label="Email"
              name="email"
              variant="outlined"
            />

            <FormControl id='password-field-form-control' variant="outlined">
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

            <FormControl id='confirm-password-field-form-control' variant="outlined">
              <InputLabel 
                htmlFor="confirmPassword" 
                error={confirmPasswordState.error}
              >
                Confirm Password *
              </InputLabel>

              <OutlinedInput
                required
                id="confirm-password-field"
                name="confirmPassword"
                error={confirmPasswordState.error}
                type={confirmPasswordState.showPassword ? 'text' : 'password'}
                onChange={() => handleOnChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password confirmation visibility"
                      onClick={handleClickShowPasswordConfrimation}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {confirmPasswordState.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={144}
              />
              <FormHelperText 
                id="confirm-password-field-helper-text"
                error={confirmPasswordState.error}
              >
                {confirmPasswordState.helperText}
              </FormHelperText>
            </FormControl>

            <div id="button-container">
              <Button
                variant="contained"
                onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { handleSignupButtonClick(event) }}
                >
                Sign Up
              </Button>
            </div>
          </FormGroup>
        </form>
      </div>
    </>
  );
};

