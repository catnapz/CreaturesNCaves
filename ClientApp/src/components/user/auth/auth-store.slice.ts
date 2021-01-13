import {
  createSlice,
  createSelector,
  PayloadAction
} from "@reduxjs/toolkit";

import firebase from "firebase";

export const AUTH_STORE_FEATURE_KEY = "authStore";

export type AuthStoreError = {
  msg: string;
  [optionalParam: string]: any;
};

export interface IAuthStoreState {
  user: firebase.User | null;
  userLoading: boolean;
  error?: AuthStoreError;
}

export const initialAuthStoreState: IAuthStoreState = {
  user: null,
  userLoading: false
};

export interface AuthErrorAction {
  error: AuthStoreError;
}

export interface UserSignedInAction { user: firebase.User; }

export const authStoreSlice = createSlice({
  name: AUTH_STORE_FEATURE_KEY,
  initialState: initialAuthStoreState as IAuthStoreState,
  reducers: {
    userLoading: state => {
      state.userLoading = true;
    },
    userLoadingError: (state, action: PayloadAction<AuthErrorAction>) => {
      state.error = action.payload.error;
      state.user = null;
      state.userLoading = false;
    },
    userSignedIn: (state, action: PayloadAction<UserSignedInAction>) => {
      state.user = action.payload.user;
      state.userLoading = false;
    },
    userSignedOut: state => {
      state.user = null;
      state.userLoading = false;
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
  userLoading,
  userLoadingError,
  userSignedIn,
  userSignedOut,
} = authStoreSlice.actions;

/**
 * Returns the state for the i18n slice
 * @param rootState - The Redux Store
 * @returns {IAuthStoreState} The auth store slice
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
 * Selector for user loading state
 */
export const selectUserLoading = createSelector(
  getAuthStoreState,
  s => s.userLoading
);

/**
 * Selector for Loading state
 */
export const selectUser = createSelector(
  getAuthStoreState,
  s => s.user
);
