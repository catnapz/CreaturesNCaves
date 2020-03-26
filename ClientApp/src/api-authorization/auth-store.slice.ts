import {
  createSlice,
  createSelector,
  PayloadAction,
  Action
} from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  Log,
  UserManager,
  User,
  UserManagerSettings,
  WebStorageStateStore
} from "oidc-client";
import { ApplicationPaths, APP_NAME } from "./api-auth-constants";

export const AUTH_STORE_FEATURE_KEY = "authStore";

export type AuthStoreError = {
  msg: string;
  [optionalParam: string]: any;
};

export interface IAuthStoreState {
  userManager: UserManager | null;
  user: User | null;
  authenticated: boolean;
  loading?: boolean;
  error?: AuthStoreError;
}

export interface ApiAuthClientConfigResponseAction {
  userManager: UserManager;
}

// export interface AuthResponseAction { userManager: UserManager; user: User; authenticated:boolean }
export interface AuthErrorAction {
  error: AuthStoreError;
}

export interface SignInOutResponseAction {
  user: User | null;
  authenticated: boolean;
}

export const initialauthStoreState: IAuthStoreState = {
  userManager: null,
  user: null,
  authenticated: false
};

export const authStoreSlice = createSlice({
  name: AUTH_STORE_FEATURE_KEY,
  initialState: initialauthStoreState as IAuthStoreState,
  reducers: {
    apiAuthClientConfigRequest: state => {
      state.loading = true;
    },
    apiAuthClientConfigResponse: (
      state,
      action: PayloadAction<ApiAuthClientConfigResponseAction>
    ) => {
      state.loading = false;
      state.userManager = action.payload.userManager;
      state.authenticated = false;
      state.user = null;
    },

    signInRequest: state => {
      state.loading = true;
    },
    signInResponse: (state, action: PayloadAction<SignInOutResponseAction>) => {
      state.loading = false;
      state.authenticated = action.payload.authenticated;
      state.user = action.payload.user;
    },

    signOutRequest: state => {
      state.loading = true;
    },
    signOutResponse: (state, action: PayloadAction<SignInOutResponseAction>) => {
      state.loading = false;
      state.authenticated = action.payload.authenticated;
      state.user = action.payload.user;
    },

    authError: (state, action: PayloadAction<AuthErrorAction>) => {
      state.error = action.payload.error;
      state.authenticated = false;
    }
  }
});

/*
 * Export reducer for store configuration.
 */
export const authStoreReducer = authStoreSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * const dispatch = useDispatch();
 * dispatch(authRequest());
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const {
  apiAuthClientConfigRequest,
  apiAuthClientConfigResponse,
  signInRequest,
  signInResponse,
  signOutRequest,
  signOutResponse,
  authError
} = authStoreSlice.actions;

/**
 * Returns the state for the i18n slice
 * @param rootState - The Redux Store
 * @returns {authStoreState} The i18n store slice
 */
export const getAuthStoreState = (rootState: any): IAuthStoreState =>
  rootState[AUTH_STORE_FEATURE_KEY];

/* =====================================================================
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * const entities = useSelector(selectAuthy);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 * =====================================================================
 */

/**
 * Selector for authenticated state
 */
export const selectAuthenticated = createSelector(
  getAuthStoreState,
  s => s.authenticated
);

/**
 * Selector for user profile state
 */
export const selectUserProfile = createSelector(
  getAuthStoreState,
  s => s.user?.profile
);

/**
 * Selector for Loading state
 */
export const selectAuthCheckLoading = createSelector(
  getAuthStoreState,
  s => s.loading
);

/**
 * Selector for Error state
 */
export const selectAuthStoreError = createSelector(
  getAuthStoreState,
  s => s.error
);

/**
 * Returns a ThunkAction that asynchronously fetches client auth configuration (required to init User Manager)
 * from the server and dispatches actions accordingly
 * @param {AuthIdentifier} Auth = The Auth to get the locale for
 * @returns {ThunkAction} returned thunk action needs to be dispatched to run
 */
export const initializeUserManager = (): ThunkAction<
  void,
  any,
  null,
  Action<any>
> => async (dispatch, getState) => {
  const currState: IAuthStoreState = getAuthStoreState(getState());

  if (currState!.userManager === null) {
    Log.logger = console; // remove later
    Log.level = Log.DEBUG;
    try {
      dispatch(apiAuthClientConfigRequest());
      console.log("API_AUTH_CLIENT_CONFIG_REQ");
      let response: Response = await fetch(
        ApplicationPaths.ApiAuthorizationClientConfigurationUrl
      );

      if (response.ok) {
        try {
          const settings: UserManagerSettings = {
            ...(await response.json()),
            automaticSilentRene: true,
            includeIdTokenInSilentRenew: true,
            userStore: new WebStorageStateStore({
              prefix: APP_NAME,
              store: window.sessionStorage
            })
          };
          const userManager = new UserManager(settings);
          _registerUserEvents(userManager, dispatch);
          let actionPayload: ApiAuthClientConfigResponseAction = { userManager };
          dispatch(apiAuthClientConfigResponse(actionPayload));
          console.log({ API_AUTH_CLIENT_CONFIG_RESPONSE: settings });
          const user = await userManager.getUser();
          if(!!user?.access_token) {
            let actionPayload: SignInOutResponseAction = { user, authenticated: true };
            dispatch(signInResponse(actionPayload));
          }
        } catch (error) {
          console.error(error);
          let actionPayload: AuthErrorAction = {
            error: {
              msg: "Unable to parse config",
              response: await response.json()
            }
          };
          dispatch(authError(actionPayload));
        }
      }
    } catch (error) {
      console.log(error);
      let actionPayload: AuthErrorAction = {
        error: { msg: "Unable to fetch auth check" }
      };
      dispatch(authError(actionPayload));
      console.log("HEALTH_CHECK_ERROR: " + actionPayload.error.msg);
    }
  }
};

function _registerUserEvents(
  userManager: UserManager,
  dispatch: ThunkDispatch<any, null, Action<any>>
) {
  userManager.events.addSilentRenewError(e => {
    console.log("silent renew error", e.message);
  });

  userManager.events.addAccessTokenExpired(() => {
    console.log("token expired, attempting renew");
    dispatch(signinSilent());
  });
}

export const signIn = (): ThunkAction<void, any, null, Action<any>> => async (dispatch, getState) => {
  dispatch(initializeUserManager());

  const currState = getAuthStoreState(getState());
  const userManager: UserManager | null = currState.userManager;
  if (userManager) {
    dispatch(signInRequest());
    try {
      await userManager.signinRedirect({ useReplaceToNavigate: true, data: {returnUrl: '/'} });
    } catch (error) {
      const actionPayload: AuthErrorAction = {error: {msg: "Failed to sign in"}};
      dispatch(authError(actionPayload));
    }
  } else {
    const actionPayload: AuthErrorAction = {error: {msg: "User Manager not initialized"}};
    dispatch(authError(actionPayload));
  }
};

export const signInRedirectCallback = (): ThunkAction<void, any, null, Action<any>> => async (dispatch, getState) => {
  dispatch(initializeUserManager());

  const currState = getAuthStoreState(getState());
  const userManager: UserManager | null = currState.userManager;
  if (userManager) {
    try {
      const user = await userManager.signinRedirectCallback();
      if(!!user.access_token) {
        window.location.replace("/");
      } else {
        const actionPayload: AuthErrorAction = {error: {msg: "Failed to sign in"}};
        dispatch(authError(actionPayload));        
      }
    } catch (error) {
      const actionPayload: AuthErrorAction = {error: {msg: "Failed to sign in"}};
      dispatch(authError(actionPayload));
    }
  } else {
    const actionPayload: AuthErrorAction = {error: {msg: "User Manager not initialized"}};
    dispatch(authError(actionPayload));
  }
};

export const signinSilent = (): ThunkAction<void, any, null, Action<any>> => async (dispatch, getState) => {
  dispatch(initializeUserManager());

  const currState = getAuthStoreState(getState());
  const userManager: UserManager | null = currState.userManager;
  if (userManager) {
    dispatch(signInRequest());
    try {
      const user = await userManager.signinSilent({ useReplaceToNavigate: true, data: {returnUrl: '/'} });
      console.log("Silent Sign In", user)
    } catch (error) {
      const actionPayload: AuthErrorAction = {error: {msg: "Failed to sign in"}};
      dispatch(authError(actionPayload));
    }
  } else {
    const actionPayload: AuthErrorAction = {error: {msg: "User Manager not initialized"}};
    dispatch(authError(actionPayload));
  }
};

export const signinSilentCallback = (): ThunkAction<void, any, null, Action<any>> => async (dispatch, getState) => {
  dispatch(initializeUserManager());

  const currState = getAuthStoreState(getState());
  const userManager: UserManager | null = currState.userManager;
  if (userManager) {
    try {
      const user = await userManager.signinSilentCallback();
      if(user) {
        const actionPayload: SignInOutResponseAction = {authenticated: !!user.access_token, user};
        dispatch(signInResponse(actionPayload));
      } else {
        const actionPayload: AuthErrorAction = {error: {msg: "Failed to sign in"}};
        dispatch(authError(actionPayload));
      }
    } catch (error) {
      const actionPayload: AuthErrorAction = {error: {msg: "Failed to sign in"}};
      dispatch(authError(actionPayload));
    }
  } else {
    const actionPayload: AuthErrorAction = {error: {msg: "User Manager not initialized"}};
    dispatch(authError(actionPayload));
  }
};

export const signOut = (): ThunkAction<void, any, null, Action<any>> => async (dispatch, getState) => {
  dispatch(initializeUserManager());

  const currState = getAuthStoreState(getState());
  const userManager: UserManager | null = currState.userManager;
  if (userManager) {
    dispatch(signOutRequest());
    try {
      await userManager.signoutRedirect({
        id_token_hint: localStorage.getItem("id_token")
      });
      await userManager.clearStaleState();

    } catch (error) {
      const actionPayload: AuthErrorAction = {error: {msg: "Failed to sign out"}};
      dispatch(authError(actionPayload));
    }
  } else {
    const actionPayload: AuthErrorAction = {error: {msg: "User Manager not initialized"}};
    dispatch(authError(actionPayload));
  }
};

export const signoutRedirectCallback  = (): ThunkAction<void, any, null, Action<any>> => async (dispatch, getState) => {
  dispatch(initializeUserManager());

  const currState = getAuthStoreState(getState());
  const userManager: UserManager | null = currState.userManager;
  if (userManager) {
    try {
      await userManager.signoutRedirectCallback();
      localStorage.clear();
      window.location.replace("/");
      await userManager.clearStaleState();
      const actionPayload: SignInOutResponseAction = {authenticated: false, user: null};
      dispatch(signOutResponse(actionPayload));

    } catch (error) {
      const actionPayload: AuthErrorAction = {error: {msg: "Failed to sign out"}};
      dispatch(authError(actionPayload));
    }
  } else {
    const actionPayload: AuthErrorAction = {error: {msg: "User Manager not initialized"}};
    dispatch(authError(actionPayload));
  }
};


