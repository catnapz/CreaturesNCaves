import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import clsx from 'clsx';
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useTheme from "@material-ui/core/styles/useTheme";
import { selectUser } from "../../user/auth/auth-store.slice";
import { useStyles } from "../shared-styles";
import { LogoutDialog } from "../../user/logout/logout-dialog";
import "./nav-menu.scss";

interface NavMenuProps {
  handleMenuButtonClick: () => void;
  isDrawerOpen: boolean;
}

export const NavMenu = (props: NavMenuProps) => {
  const authenticated = useSelector(selectUser);
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

  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const closeMenu = () => {
    setAnchorEl(null);
  }
  
  const handleLogoutDialogOpen = () => {
    closeMenu();
    setLogoutDialogOpen(true);
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  }

  return (
    <>
      <Avatar
        onClick={openMenu}
        src="/broken-image.jpg"
        className={"profile-icon"} />
      <Menu
        id="navbar-account-menu"
        anchorEl={anchorEl}
        keepMounted
        open={menuOpen}
        onClose = {closeMenu}
      >
        <Typography id="navbar-account-menu-header" variant="overline"> {"Hello " + user?.displayName} </Typography>
        <Divider variant="middle"/>
        <Link to="/profile"><MenuItem onClick={closeMenu}><Typography>Profile</Typography></MenuItem></Link>
        <MenuItem onClick={handleLogoutDialogOpen}><Typography>Logout</Typography></MenuItem>
      </Menu>
      <LogoutDialog open={logoutDialogOpen} onClose={handleLogoutDialogClose} />
    </>
  );
};

