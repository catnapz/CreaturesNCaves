import React from 'react';
import { NavMenu } from './nav-menu';
import { SideBar } from "./side-bar";
import useTheme from "@material-ui/core/styles/useTheme";
import { useStyles } from "./shared-styles";
import CssBaseline from "@material-ui/core/CssBaseline";

export const Layout = (props: { children?: React.ReactNode }) => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <NavMenu handleMenuButtonClick={handleDrawerOpen} isDrawerOpen={isDrawerOpen} />
        <SideBar handleDrawerClose={handleDrawerClose} isDrawerOpen={isDrawerOpen} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    </>
  );
}