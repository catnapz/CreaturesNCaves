import React from 'react';
import clsx from 'clsx';
import {Drawer} from "@material-ui/core";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import useTheme from "@material-ui/core/styles/useTheme";
import {useStyles} from "./shared-styles";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";
import "./side-bar.scss";

interface SidebarProps {
  handleDrawerClose: () => void;
  isDrawerOpen: boolean;
}

export const SideBar = (props: SidebarProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  
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
        <Typography variant="h5" className={clsx('sidebar-category-text', {
          'visible': props.isDrawerOpen
        })} >Campaign</Typography>
      <Divider/>
      <List>
        <ListItem button>
          <ListItemIcon><InboxIcon/></ListItemIcon>
          <ListItemText primary="Campaigns" />
        </ListItem>
      </List>
      <Typography variant="h5" className={clsx('sidebar-category-text', {
        'visible': props.isDrawerOpen
      })} >Utility</Typography>
      <Divider/>
      <List>
        
        <NavLink className="sidebar-nav-link" to="/counter">
          <ListItem button className="sidebar-nav-list-item">
            <ListItemIcon className="sidebar-nav-list-item-icon"><InboxIcon/></ListItemIcon>
            <ListItemText className="sidebar-nav-list-item-text" primary="Counter" />
          </ListItem>
        </NavLink>

        <NavLink className="sidebar-nav-link" to="/checkusers">
          <ListItem button className="sidebar-nav-list-item">
            <ListItemIcon className="sidebar-nav-list-item-icon"><InboxIcon/></ListItemIcon>
            <ListItemText className="sidebar-nav-list-item-text" primary="Users" />
          </ListItem>
        </NavLink>
        
      </List>
    </Drawer>
  );
}