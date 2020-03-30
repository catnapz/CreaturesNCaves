import {
  createSlice,
  createSelector,
  PayloadAction,
  Action,
} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

export const HEALTH_STORE_FEATURE_KEY = 'healthStore';

export type HealthStoreError = {
  msg: string;
};

export interface IHealthStoreState {
  healthy: boolean;
  loading?: boolean;
  error?: HealthStoreError;
}

export interface HealthResponseAction { statusCode: number }
export interface HealthErrorAction { error: HealthStoreError }

export const initialhealthStoreState: IHealthStoreState = {
  healthy: false
};

export const healthStoreSlice = createSlice({
  name: HEALTH_STORE_FEATURE_KEY,
  initialState: initialhealthStoreState as IHealthStoreState,
  reducers: {
    healthRequest: (state) => {
      state.loading = true;
    },
    healthResponse: (state, action: PayloadAction<HealthResponseAction>) => {
      state.loading = false;
      state.healthy = (action.payload.statusCode === 200) ? true : false;
    },
    healthError: (state, action: PayloadAction<HealthErrorAction>) => {
      state.error = action.payload.error;
      state.healthy = false;
    }
  }
});

/*
 * Export reducer for store configuration.
 */
export const healthStoreReducer = healthStoreSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * const dispatch = useDispatch();
 * dispatch(healthRequest());
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const {
  healthRequest,
  healthResponse,
  healthError
} = healthStoreSlice.actions;

/**
 * Returns the state for the i18n slice
 * @param rootState - The Redux Store
 * @returns {healthStoreState} The i18n store slice
 */
export const gethealthStoreState = (rootState: any): IHealthStoreState =>
  rootState[HEALTH_STORE_FEATURE_KEY];

/* =====================================================================
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * const entities = useSelector(selectHealthy);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 * =====================================================================
 */

/**
 * Selector for healthy state
 */
export const selectHealthy = createSelector(
  gethealthStoreState,
  s => s.healthy
);

/**
 * Selector for Loading state
 */
export const selectHealthCheckLoading = createSelector(
  gethealthStoreState,
  s => s.loading
);

/**
 * Selector for Error state
 */
export const selectHealthStoreError = createSelector(
  gethealthStoreState,
  s => s.error
);

/**
 * Returns a ThunkAction that asynchronously fetches locales from the server and dispatches actions accordingly 
 * @param {HealthIdentifier} Health = The Health to get the locale for 
 * @returns {ThunkAction} returned thunk action needs to be dispatched to run
 */
export const checkHealth = (): ThunkAction<void, any, null, Action<any>> => async (dispatch) => {
    try {
      dispatch(healthRequest());
      console.log('HEALTH_CHECK_REQ');
      let response: Response = await fetch('health');
      let actionPayload: HealthResponseAction = {
        statusCode: response.status
      }
      dispatch(healthResponse(actionPayload));
      console.log('HEALTH_CHECK_RESPONSE: ' + {statusCode: response.status});

    } catch (error) {
      console.log(error);
      let actionPayload: HealthErrorAction = {
        error: { msg: 'Unable to fetch health check' }
      }
      dispatch(healthError(actionPayload));
      console.log('HEALTH_CHECK_ERROR: ' + actionPayload.error.msg);
    }
};
