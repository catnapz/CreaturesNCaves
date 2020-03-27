import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserProfile, signOut } from './auth-store.slice';

export const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);

  function deleteConfirmation(){
    if(window.confirm("Are you sure you want to delete your account?")) {
      // TODO: delete account
      dispatch(signOut());
    }
  }

  return (
    <>
      <h1>Hello {profile?.preferred_username}</h1>
      <button onClick={() => deleteConfirmation()}>Delete Account</button>
      
    </>
  );
}
