import {
  createSlice,
  createSelector,
  PayloadAction
} from "@reduxjs/toolkit";
import {
  UserManager,
  User,
} from "oidc-client";

export const AUTH_STORE_FEATURE_KEY = "authStore";

export type AuthStoreError = {
  msg: string;
  [optionalParam: string]: any;
};

export interface IAuthStoreState {
  user: User | null;
  userLoading: boolean;
  error?: AuthStoreError;
}

export interface ApiAuthClientConfigResponseAction {
  userManager: UserManager;
  loading: boolean;
}

export const initialauthStoreState: IAuthStoreState = {
  user: null,
  userLoading: false
};

export interface AuthErrorAction {
  error: AuthStoreError;
}

export interface UserFoundAction { user: User; }

export const authStoreSlice = createSlice({
  name: AUTH_STORE_FEATURE_KEY,
  initialState: initialauthStoreState as IAuthStoreState,
  reducers: {
    userLoading: state => {
      state.userLoading = true;
    },
    userFound: (state, action: PayloadAction<UserFoundAction>) => {
      state.user = action.payload.user;
      state.userLoading = false;
    },
    userExpired: state => {
      state.user = null;
      state.userLoading = false;
    },
    userLoadingError: (state, action: PayloadAction<AuthErrorAction>) => {
      state.error = action.payload.error;
      state.user = null;
      state.userLoading = false;
    },
    userSignedOut: state => {
      state.user = null;
      state.userLoading = false;
    },
    silentRenewError: (state, action: PayloadAction<AuthErrorAction>) => {
      state.error = action.payload.error;
      state.user = null;
      state.userLoading = false;
    },
    sessionTerminated: state => {
      state.user = null;
      state.userLoading = false;
    },
    userExpiring: () => { }
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
  userLoading,
  userExpired,
  userFound,
  userLoadingError,
  silentRenewError,
  sessionTerminated,
  userSignedOut,
  userExpiring
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
export const selectUserLoading = createSelector(
  getAuthStoreState,
  s => s.userLoading
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
export const selectUser = createSelector(
  getAuthStoreState,
  s => s.user
);

/**
 * Selector for authenticated state
 */
export const selectAuthenticated = createSelector(
  getAuthStoreState,
  s => s.user?.access_token ? true : false
);
