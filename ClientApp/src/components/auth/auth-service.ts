import { EnhancedStore } from "@reduxjs/toolkit"
import { UserManager, UserManagerSettings, User } from "oidc-client";
import { ApplicationPaths } from "./api-auth-constants";
import { userLoading, userFound, userExpired, userLoadingError } from "./auth-store.slice";

export const initUserManager = async (): Promise<UserManager | null> => {
  let userManager: UserManager | null = null;
  let response: Response = await fetch(
    ApplicationPaths.ApiAuthorizationClientConfigurationUrl
  );

  if (response.ok) {
    try {
      const settings: UserManagerSettings = {
        ...(await response.json()),
        automaticSilentRenew: true,
        accessTokenExpiringNotificationTime: 3,
        silent_redirect_uri: "https://localhost:5001/silentrenew.html"   
      };
      userManager = new UserManager(settings);
      console.log({ API_AUTH_CLIENT_CONFIG_RESPONSE: settings });
    } catch (error) {
      console.error(error);
      // hard throw and exit app?
    }
  };
  return userManager;
}

export const loadUser = async (userManager: UserManager, store: EnhancedStore): Promise< User| null > => {
  if(!store || !userManager) {
    throw new Error('loadUser() => incorrect arguments passed. Need UserManager and ReduxStore');
  }

  store.dispatch(userLoading());

  let user: User | null = null;
  
  try {
    await userManager.signinSilent();
    user = await userManager.getUser();
    getUserCallback(user, store);
  } catch (error) {
    errorCallback(error, store);
  }
  
  return user;
}

const getUserCallback = async (user: User | null = null, store: EnhancedStore): Promise< User| null > => {
  if (user && !user.expired) {
    store.dispatch(userFound({user}));
  } else if (!user || (user && user.expired)) {
    store.dispatch(userExpired());
  }
  return user
  ;
}

const errorCallback = (error: Error, store: EnhancedStore) => {
  store.dispatch(userLoadingError());
}

const processSilentRenew = async () => {
  // pass in existing user manager?
  const userManager = await initUserManager();
  userManager?.signinCallback();
}

// export const parseJwt = (token: string) => {
//   const base64Url = token.split(".")[1];
//   const base64 = base64Url.replace("-", "+").replace("_", "/");
//   return JSON.parse(atob(base64));
// };

// // a request helper which reads the access_token from the redux state and passes it in its HTTP request
// function apiRequest(url, method = "GET") {
//   const token = store.getState().oidc.user.access_token;
//   const headers = new Headers();
//   headers.append("Accept", "application/json");
//   headers.append("Authorization", `Bearer ${token}`);

//   const options = {
//     method,
//     headers
//   };

//   return fetch(url, options)
//     .then(res => res.json())
//     .then(data => ({ data }))
//     .catch(error => ({ error }));
// }