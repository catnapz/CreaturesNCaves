import React from 'react';
import clsx from 'clsx';
import Drawer from "@material-ui/core/Drawer";
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useTheme from "@material-ui/core/styles/useTheme";
import { useStyles } from "./shared-styles";
import { SideBarItem } from "./side-bar-item";
import { SideBarCategory } from "./side-bar-category";
import "./side-bar.scss";
import { useSelector } from "react-redux";
import { selectAuthenticated } from "../auth/auth-store.slice";

interface SidebarProps {
  handleDrawerClose: () => void;
  isDrawerOpen: boolean;
}

export const SideBar = (props: SidebarProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const authenticated = useSelector(selectAuthenticated);

  return (
    <Drawer
      variant="permanent"
      id="side-bar"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.isDrawerOpen,
        [classes.drawerClose]: !props.isDrawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.isDrawerOpen,
          [classes.drawerClose]: !props.isDrawerOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={props.handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>

      {authenticated &&
        <SideBarCategory open={props.isDrawerOpen} title={"Game Master"}>
          <List>
            <SideBarItem to="/counter" title={"Counter"} subtitle={"Dev Test"} open={props.isDrawerOpen} />
            <SideBarItem to="/campaigns" title={"Campaigns"} />
            <SideBarItem to="/characters" title={"Characters"} />

          </List>
        </SideBarCategory>
      }

      <SideBarCategory open={props.isDrawerOpen} title={"Quick Tools"}>
        <List>
          <SideBarItem to="/roll-initiative" title={"Combat"} />
          <SideBarItem to="/boblin" title={"Random Character"} />
          <SideBarItem to="/loot" title={"Random Loot"} />
        </List>
      </SideBarCategory>
    </Drawer>
  );
}