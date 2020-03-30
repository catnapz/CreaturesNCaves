import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UserManager, User } from 'oidc-client';
import { userFound, silentRenewError, userExpired, sessionTerminated, userSignedOut, userExpiring } from './auth-store.slice';

interface AuthProviderProps {
  userManager: UserManager;
  children?: React.ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => { 
  const dispatch = useDispatch();

  useEffect(() => {

    props.userManager.events.addUserLoaded(onUserLoaded);
    props.userManager.events.addSilentRenewError(onSilentRenewError);
    props.userManager.events.addAccessTokenExpired(onAccessTokenExpired);
    props.userManager.events.addAccessTokenExpiring(onAccessTokenExpiring);
    props.userManager.events.addUserUnloaded(onUserUnloaded);
    props.userManager.events.addUserSignedOut(onUserSignedOut);

    return () => {
      props.userManager.events.removeUserLoaded(onUserLoaded);
      props.userManager.events.removeSilentRenewError(onSilentRenewError);
      props.userManager.events.removeAccessTokenExpired(onAccessTokenExpired);
      props.userManager.events.removeAccessTokenExpiring(onAccessTokenExpiring);
      props.userManager.events.removeUserUnloaded(onUserUnloaded);
      props.userManager.events.removeUserSignedOut(onUserSignedOut);
    };
  }, []);

  // event callback when the user has been loaded (on silent renew or redirect)
  const onUserLoaded = (user: User) => {
    dispatch(userFound({user}));
  };

  // event callback when silent renew errored
  const onSilentRenewError = (error: any) => {
    console.error(`ERROR: onSilentRenewError => ${error}`);
    dispatch(silentRenewError());
  };

  // event callback when the access token expired
  const onAccessTokenExpired = () => {
    dispatch(userExpired());
  };

  // event callback when the user is logged out
  const onUserUnloaded = () => {
    dispatch(sessionTerminated());
  };

  // event callback when the user is expiring
  const onAccessTokenExpiring = () => {
    // silent renew here?
    dispatch(userExpiring());
  }

  // event callback when the user is signed out
  const onUserSignedOut = () => {
    dispatch(userSignedOut());
  }

  return <>{props.children}</>
}

