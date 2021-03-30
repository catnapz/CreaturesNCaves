import React from "react";
import BsSpinner from "react-bootstrap/Spinner";

export interface ISpinnerProps {
  asSpan?: boolean;
  qaHook?: string;
}

const Spinner = (props: ISpinnerProps) => (
  <BsSpinner
    as={props.asSpan ? "span" : "div"}
    animation="border"
    className="cnc-spinner"
    role="status"
    data-testid={props.qaHook ? props.qaHook : "cnc-spinner"}
  />
);

export default Spinner;
