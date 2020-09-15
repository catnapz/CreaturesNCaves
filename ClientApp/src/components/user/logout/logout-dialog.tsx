import React from "react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { AuthService } from "../../../auth/auth-service";

interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
}

const authService = new AuthService();

export const LogoutDialog = (props: LogoutDialogProps) => {
  const apolloClient = useApolloClient();
  const history = useHistory();

  const handleLogout = async () => {
    await apolloClient.resetStore();
    await authService.signOut();
    history.push('/');
  }

  const handleClose = () => {
    props.onClose();
  }

  return (
    <Dialog
      className="logout-dialog"
      open={props.open}
      onClose={handleClose}
      closeAfterTransition
    >
      <DialogTitle id="logout-dialog-title">
        Logout?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Logout Confirmation.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className="logout-cancel-button" onClick={handleClose} variant="contained">
          Cancel
        </Button>

        <Button className="logout-button" onClick={handleLogout} variant="contained">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};
