import React, { useState } from "react";
import { FormControl, FormLabel, InputGroup } from "react-bootstrap";

import { IFormInput } from "../form-input/form-input";
import cn from "clsx";

import { Button, FAIcon } from "../../../../components";

export interface IFormPasswordInput extends Omit<IFormInput, "type"> {}

const FormPasswordInput = (props: IFormPasswordInput) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={cn("cnc-form--input cnc-form--password-input", {
        [props.className as string]: !!props.className,
      })}
    >
      <FormLabel className="cnc-form--input-label">{props.label}</FormLabel>
      <InputGroup hasValidation className="cnc-form--input-group">
        <FormControl
          {...props}
          type={showPassword ? "text" : "password"}
          aria-label={props.label}
          className="cnc-form--input-control"
        />
        <InputGroup.Append>
          <Button onClick={toggleShowPassword}>
            {showPassword ? <FAIcon icon="eye-slash" /> : <FAIcon icon="eye" />}
          </Button>
        </InputGroup.Append>
        <FormControl.Feedback
          className="cnc-form--input-feedback"
          type={props.feedBackType}
        >
          {props.feedback}
        </FormControl.Feedback>
      </InputGroup>
    </div>
  );
};

export default FormPasswordInput;
