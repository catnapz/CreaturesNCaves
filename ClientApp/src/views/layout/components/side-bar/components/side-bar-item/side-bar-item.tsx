import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Icon } from "../../../../../../components/icons";
import "./side-bar-item.scss";

interface SideBarItemProps {
  to: string;
  title: string;
  isExpanded: boolean;
  exact?: boolean;
  icon: Icon;
}

export const SideBarItem = (props: SideBarItemProps) => {
  return (
    <NavLink className="cnc-side-bar--item" exact={props.exact} to={props.to}>
      <div className="cnc-side-bar--item-icon-container">
        <props.icon className="cnc-side-bar--item-icon" />
      </div>
      <span
        className={clsx("cnc-side-bar--item-text", {
          visible: props.isExpanded,
        })}
      >
        {props.title}
      </span>
    </NavLink>
  );
};
