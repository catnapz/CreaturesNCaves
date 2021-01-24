import React from 'react';
import { SnackbarProvider } from 'notistack';
import CssBaseline from "@material-ui/core/CssBaseline";
import { NavMenu } from './nav-menu/nav-menu';
import { Sidebar } from "./sidebar/sidebar";
import { Notifications } from './notifications/notifications';
import './layout.scss';

export const Layout = (props: { children?: React.ReactNode }) => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <SnackbarProvider
      maxSnack={2}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Notifications />
      <div className='root'>
        <CssBaseline />
        <main className='main'>
          <NavMenu handleMenuButtonClick={handleDrawerOpen} isDrawerOpen={isDrawerOpen} />
          <Sidebar handleDrawerClose={handleDrawerClose} isDrawerOpen={isDrawerOpen} />
          <div 
            className={`content ${isDrawerOpen ? "content-drawer-open" : "content-drawer-closed"}`}
          >
            {props.children}
          </div>
        </main>
      </div>
    </SnackbarProvider>
  );
}