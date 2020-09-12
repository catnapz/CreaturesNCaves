import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../auth/auth-store.slice';
import Button from '@material-ui/core/Button';
import {authService} from "../../../auth/auth-service";

export const Profile = () => {
  const user = useSelector(selectUser);

  async function deleteConfirmation(){
    if(window.confirm("Are you sure you want to delete your account?")) {
      const resp = await fetch('/Account/Delete', {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({"userId": user?.uid})
      });
      if (resp.ok) await authService.signOut();
    }
  }

  return (
    <>
      <h1>Hello {user?.displayName}</h1>
      <Button variant='contained' onClick={() => deleteConfirmation()}>Delete Account</Button>
      
    </>
  );
}
