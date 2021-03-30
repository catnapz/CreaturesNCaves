import React from "react";
import { FormControl, FormControlProps, FormLabel } from "react-bootstrap";
import cn from "clsx";

export interface IFormInput extends FormControlProps {
  name: string;
  label: string;
  className?: string;
  feedBackType?: "invalid" | "valid";
  feedback?: string;
  placeHolder?: HTMLInputElement["placeholder"];
  onBlur?: HTMLInputElement["onblur"];
}

const FormInput = (props: IFormInput) => (
  <div
    className={cn("cnc-form--input", {
      [props.className as string]: !!props.className,
    })}
  >
    <FormLabel className="cnc-form--input-label">{props.label}</FormLabel>
    <FormControl {...props} className="cnc-form--input-control" />
    <FormControl.Feedback
      className="cnc-form--input-feedback"
      type={props.feedBackType}
    >
      {props.feedback}
    </FormControl.Feedback>
  </div>
);

export default FormInput;
