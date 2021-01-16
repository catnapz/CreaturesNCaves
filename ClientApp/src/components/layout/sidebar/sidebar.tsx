import React from 'react';
import clsx from 'clsx';
import Drawer from "@material-ui/core/Drawer";
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useTheme from "@material-ui/core/styles/useTheme";
import { useStyles } from "../shared-styles";
import { SidebarItem } from "./sidebar-item";
import { SidebarCategory } from "./sidebar-category";
import "./sidebar.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../user/auth/auth-store.slice";

interface SidebarProps {
  handleDrawerClose: () => void;
  isDrawerOpen: boolean;
}

export const Sidebar = (props: SidebarProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const authenticated = useSelector(selectUser);

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
        <SidebarCategory open={props.isDrawerOpen} title={"Game Master"}>
          <List>
            <SidebarItem to="/counter" title={"Counter"} subtitle={"Dev Test"} open={props.isDrawerOpen} />
            <SidebarItem to="/campaigns" title={"Campaigns"} />
            <SidebarItem to="/characters" title={"Characters"} />

          </List>
        </SidebarCategory>
      }

      <SidebarCategory open={props.isDrawerOpen} title={"Quick Tools"}>
        <List>
          <SidebarItem to="/roll-initiative" title={"Combat"} />
          <SidebarItem to="/boblin" title={"Random Character"} />
          <SidebarItem to="/loot" title={"Random Loot"} />
        </List>
      </SidebarCategory>
    </Drawer>
  );
}