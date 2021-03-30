import React from "react";
import cn from "clsx";
import { Form as BsForm, FormProps } from "react-bootstrap";

export interface IFormProps extends FormProps {
  className?: string;
}

const Form = (props: IFormProps) => (
  <BsForm
    {...props}
    noValidate
    className={cn("cnc-form", {
      [props.className as string]: !!props.className,
    })}
  >
    {props.children}
  </BsForm>
);

export default Form;
