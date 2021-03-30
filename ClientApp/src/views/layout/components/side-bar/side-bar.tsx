import React from "react";
import clsx from "clsx";
import { useIsAuthenticated } from "../../../../auth";
import { Button, ArrowIcon, PlaceHolderIcon } from "../../../../components";
import { SideBarCategory, SideBarItem } from "./components";
import "./side-bar.scss";

interface ISideBarProps {
  handleToggle: () => void;
  isExpanded: boolean;
}

const SideBar = (props: ISideBarProps) => {
  const authenticated = useIsAuthenticated();

  return (
    <nav
      className={clsx("cnc-side-bar", {
        "cnc-side-bar-collapsed": !props.isExpanded,
      })}
    >
      <header className="cnc-side-bar--header">
        <Button
          className="cnc-side-bar--toggle-button"
          onClick={props.handleToggle}
        >
          <ArrowIcon className="cnc-side-bar--toggle-icon" />
        </Button>
      </header>
      <section className="cnc-side-bar--content">
        <SideBarCategory isExpanded={props.isExpanded} title={"Quick Tools"}>
          <SideBarItem
            to="/roll-initiative"
            title={"Combat"}
            isExpanded={props.isExpanded}
            icon={PlaceHolderIcon}
          />
          <SideBarItem
            to="/boblin"
            title={"Random Character"}
            isExpanded={props.isExpanded}
            icon={PlaceHolderIcon}
          />
          <SideBarItem
            to="/loot"
            title={"Random Loot"}
            isExpanded={props.isExpanded}
            icon={PlaceHolderIcon}
          />
        </SideBarCategory>

        {authenticated && (
          <SideBarCategory isExpanded={props.isExpanded} title={"Game Master"}>
            <SideBarItem
              to="/test"
              title={"Test Page"}
              isExpanded={props.isExpanded}
              icon={PlaceHolderIcon}
            />
            <SideBarItem
              to="/campaigns"
              title={"Campaigns"}
              isExpanded={props.isExpanded}
              icon={PlaceHolderIcon}
            />
            <SideBarItem
              to="/characters"
              title={"Characters"}
              isExpanded={props.isExpanded}
              icon={PlaceHolderIcon}
            />
          </SideBarCategory>
        )}
      </section>
      <footer className="cnc-side-bar--footer" />
    </nav>
  );
};

export default SideBar;
