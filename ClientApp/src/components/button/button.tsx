import React from "react";
import clsx from "clsx";
import BsButton from "react-bootstrap/Button";

export interface IButtonProps {
  onClick?: () => void;
  qaHook?: string;
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit";
}

const Button = (props: IButtonProps) => (
  <BsButton
    className={clsx("cnc-button", {
      [props.className as string]: !!props.className
    })}
    // className={`cnc-button ${props.className ? props.className : ""}`}
    onClick={props.onClick}
    data-testid={props.qaHook}
    type={props.type}
  >
    {props.children}
  </BsButton>
);

export default Button;
