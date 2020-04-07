import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserProfile } from './auth-store.slice';
import { UserManager } from "oidc-client";

export const Profile = (props: { userManager: UserManager }) => {
  const profile = useSelector(selectUserProfile);

  async function deleteConfirmation(){
    if(window.confirm("Are you sure you want to delete your account?")) {
      const resp = await fetch('/Account/Delete', {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({"userId": profile?.sub})
      });
      if (resp.ok) await props.userManager.signoutRedirect();
    }
  }

  return (
    <>
      <h1>Hello {profile?.preferred_username}</h1>
      <button onClick={() => deleteConfirmation()}>Delete Account</button>
      
    </>
  );
}
