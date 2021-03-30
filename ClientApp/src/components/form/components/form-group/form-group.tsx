import React from "react";
import { FormGroup as BsFormGroup, FormGroupProps } from "react-bootstrap";
import cn from "clsx";

export interface IFormGroupProps extends FormGroupProps {
  className?: string;
}

const FormGroup = (props: IFormGroupProps) => (
  <BsFormGroup
    {...props}
    className={cn("cnc-form--group", {
      [props.className as string]: !!props.className,
    })}
  >
    {props.children}
  </BsFormGroup>
);

export default FormGroup;
