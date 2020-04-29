import React from 'react';
import { SnackbarProvider } from 'notistack';
import useTheme from "@material-ui/core/styles/useTheme";
import { useStyles } from "./shared-styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { NavMenu } from './nav-menu/nav-menu';
import { Sidebar } from "./sidebar/sidebar";
import { Notifications } from './notifications/notifications';

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
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Notifications/>
      <div className={classes.root}>
        <CssBaseline />
        <NavMenu handleMenuButtonClick={handleDrawerOpen} isDrawerOpen={isDrawerOpen} />
        <Sidebar handleDrawerClose={handleDrawerClose} isDrawerOpen={isDrawerOpen} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    </SnackbarProvider>
  );
}