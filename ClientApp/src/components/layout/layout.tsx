import React from 'react';
import { SnackbarProvider } from 'notistack';
import { useStyles } from "./shared-styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { NavMenu } from './nav-menu/nav-menu';
import { Sidebar } from "./sidebar/sidebar";
import { Notifications } from './notifications/notifications';

export const Layout = (props: { children?: React.ReactNode }) => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const theme = createMuiTheme({
    typography: {
      h1: {
        fontFamily: "Nodesto Caps Condensed"
      },
      h4: {
        fontFamily: "Mr Eaves"
      },
      h5: {
        fontFamily: "Nodesto Caps Condensed"
      },
      body1: {
        fontFamily: "Scaly Sans"
      },
      body2: {
        fontFamily: "Scaly Sans Caps"
      }, 
      button: {
        fontFamily: "Scaly Sans",
        fontWeight: "bold"
      },
      overline: {
        fontFamily: "Scaly Sans Caps"
      }
    },
    palette: {
      primary: {
        main: "#333333",
        dark: "#212121",
        light: "#484848",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#03a9f4",
        dark: "#007ac1",
        light: "#67daff",
        contrastText: "#ffffff"
      }
    },
  });
  const classes = useStyles(theme);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Notifications />
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
    </ThemeProvider>
  );
}