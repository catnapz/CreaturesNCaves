import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import clsx from 'clsx';
import {AppBar, Avatar, IconButton, Toolbar, ButtonBase, Divider} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useTheme from "@material-ui/core/styles/useTheme";
import {
  selectAuthenticated,
  selectUserProfile
} from "../auth/auth-store.slice";
import {useStyles} from "./shared-styles";
import "./nav-menu.scss";

interface NavMenuProps {
  handleMenuButtonClick: () => void;
  isDrawerOpen: boolean;
}

export const NavMenu = (props: NavMenuProps) => {
  const authenticated = useSelector(selectAuthenticated);
  const theme = useTheme();
  const classes = useStyles(theme);
  
  return (
    <>
      <AppBar 
        position="fixed" 
        id="app-bar"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.isDrawerOpen,
        })}
      >
        <Toolbar>
          <IconButton 
            edge="start" 
            id={"menu-button"} 
            onClick={props.handleMenuButtonClick}
            aria-label="menu"
            className={clsx(classes.menuButton, {
              [classes.hide]: props.isDrawerOpen,
            })}
          >
            <MenuIcon/>
          </IconButton>
          <div id="nav-bar-title">
            <Link to="/"><Typography className="text">Creatures &amp; Caves</Typography></Link>
          </div>
          {authenticated ? <AuthenticatedView/> : <UnauthenticatedView/>}
        </Toolbar>
      </AppBar>
    </>
  );

};

const UnauthenticatedView = () => (
  <>
    <NavLink to="/login">Login</NavLink>
    <NavLink to="/signup">Sign Up</NavLink>
  </>
);

const AuthenticatedView = () => {

  const userProfile = useSelector(selectUserProfile);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const closeMenu = () => {
    setAnchorEl(null);
  }

  return (
    <>
      <Avatar
        onClick={openMenu}
        src="/broken-image.jpg"
        className={"profile_icon"} />
      <Menu
        id="navbar-account-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose = {closeMenu}
      >
        <Typography id="navbar-account-menu-header" variant="overline"> {"Hello " + userProfile?.name} </Typography>
        <Divider variant="middle"/>
        <Link to="/profile"><MenuItem onClick={closeMenu}><Typography>Profile</Typography></MenuItem></Link>
        <Link to="/logout"><MenuItem onClick={closeMenu}><Typography>Logout</Typography></MenuItem></Link>
      </Menu>
    </>
  );
};

