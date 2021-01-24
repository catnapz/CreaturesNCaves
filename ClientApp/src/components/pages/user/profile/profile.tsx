import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {selectUser} from '../auth/auth-store.slice';
import {Button} from '../../../button/button';
import {AuthService} from "../../../../auth/auth-service";
import {FormGroup, FormLabel, TextField} from "@material-ui/core";

const authService = new AuthService();

export const Profile = () => {
  const user = useSelector(selectUser);
  const [userDisplayName, setUserDisplayName] = useState(user?.displayName);
  const [userEmail, setUserEmail] = useState(user?.email);
  const [editState, setEditState] = useState(false);

  async function deleteConfirmation() {
    if (window.confirm("Are you sure you want to delete your account?")) {
      const resp = await fetch('/Account/Delete', {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({"userId": user?.uid})
      });
      // TODO: Delete User Data and send delete request to firebaseAPI 
      if (resp.ok) await authService.signOut();
    }
  }

  const cancelChanges = () => {
    setEditState(false);
    setUserDisplayName(user?.displayName);
    setUserEmail(user?.email);
  }

  const editStateButtons = () =>
    <div>
      <Button>Save</Button>
      <Button variant={"secondary"} onClick={cancelChanges}>Cancel</Button>
      <Button variant={"danger"} onClick={() => deleteConfirmation()}>Delete Account</Button>
    </div>

  return (
    <>
      <h1>{`Hello${userDisplayName ? " " + userDisplayName : ''}!`}</h1>
      <form>
        <FormLabel>Your Profile</FormLabel>
        <FormGroup>
          <TextField
            id='display-name-field'
            label="Display Name"
            variant={editState ? "outlined" : "standard"}
            value={userDisplayName}
            onChange={(e) => setUserDisplayName(e.target.value)}
            disabled={!editState}
          />
          <TextField
            id='email-field'
            label="Email"
            type={"email"}
            variant={editState ? "outlined" : "standard"}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            disabled={!editState}
          />
        </FormGroup>
      </form>
      {editState ? editStateButtons() : <Button onClick={() => setEditState(true)}>Edit</Button>}
    </>
  );
}
