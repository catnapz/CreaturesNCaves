import React from 'react';
import {NavLink} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

interface SideBarItemProps {
  to: string;
  title: string;
  open: boolean;
  exact?: boolean;
  icon?: React.ReactElement;
  subtitle?: string;
}

export const SidebarItem = (props: SideBarItemProps) => {
  return (
    <NavLink className="sidebar-nav-link" exact={props.exact ?? true} to={props.to}>
      <ListItem button className="sidebar-nav-list-item">
        <ListItemIcon className="sidebar-nav-list-item-icon">
          {props.icon ?? <BrokenImageIcon/>}
        </ListItemIcon>
        {props.open &&
        <ListItemText 
          className="sidebar-nav-list-item-text" 
          primary={props.title} 
          secondary={props.open ? props.subtitle : ""}
        />}
      </ListItem>
    </NavLink>
  );
}