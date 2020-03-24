import {
  createSlice,
  createSelector,
  PayloadAction,
  Action
} from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import {
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
export const selectAuthy = createSelector(
  getAuthStoreState,
  s => s.authenticated
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
 * Returns a ThunkAction that asynchronously fetches locales from the server and dispatches actions accordingly
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
              prefix: APP_NAME
            })
          };
          let actionPayload: ApiAuthClientConfigResponseAction = {
            userManager: new UserManager(settings)
          };
          dispatch(apiAuthClientConfigResponse(actionPayload));
          console.log({ "API_AUTH_CLIENT_CONFIG_RESPONSE": settings });
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
