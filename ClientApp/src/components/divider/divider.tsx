import React from "react";

import "./divider.scss";

export interface IDividerProps {
  className?: string;
  children?: React.ReactNode;
}

const Divider = (props: IDividerProps) => (
  <div
    className={`cnc-divider--container ${
      props.className ? props.className : ""
    }`}
  >
    <div className="cnc-divider--border" />
    {!!props.children && (
      <>
        <span className="cnc-divider--content">{props.children}</span>
        <div className="cnc-divider--border" />
      </>
    )}
  </div>
);

export default Divider;
