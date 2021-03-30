import React from "react";
import clsx from "clsx";
import "./side-bar-category.scss";

interface SideBarCategoryProps {
  isExpanded: boolean;
  title: string;
  children?: React.ReactNode;
}

export const SideBarCategory = (props: SideBarCategoryProps) => {
  return (
    <div className="cnc-side-bar--category">
      <h1
        className={clsx("cnc-side-bar--category-text", {
          visible: props.isExpanded,
        })}
      >
        {props.title}
      </h1>
      {props.children}
    </div>
  );
};
