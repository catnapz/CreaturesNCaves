import {
  createSlice,
  createSelector
} from "@reduxjs/toolkit";

export const COUNTER_STORE_FEATURE_KEY = "counterStore";

/*
 * Change this from `any` if there is a more specific error type.
 */
export type CounterStoreError = any;

export interface ICounterStoreState {
  count: number;
}

export const initialCounterStoreState: ICounterStoreState = {
  count: 0
};

export const counterStoreSlice = createSlice({
  name: COUNTER_STORE_FEATURE_KEY,
  initialState: initialCounterStoreState as ICounterStoreState,
  reducers: {
    increment: state => {
      state.count += 1;
    },
    decrement: state => {
      state.count -= 1;
    },
  }
});

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * const dispatch = useDispatch();
 * dispatch(getCounterStoreSuccess([{ id: 1 }]));
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const {
  increment,
  decrement
} = counterStoreSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * const count = useSelector(selectCounterStoreCount);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
export const getCounterStoreState = (rootState: any): ICounterStoreState =>
  rootState[COUNTER_STORE_FEATURE_KEY];

export const selectCount = createSelector(
  getCounterStoreState,
  s => s.count
);

/*
 * Export reducer for store configuration.
 */
export const counterStoreReducer = counterStoreSlice.reducer;

/**
 * Defines what states can be persisted into local storage
 */
export interface ICounterStorePersistableState {
  count: number;
} 

/**
 * Returns the state to be persisted to local storage
 * @param rootState - The Redux store's state
 */
export const getCounterStorePersistableState = (rootState: any): ICounterStorePersistableState => {
  let state: ICounterStoreState = getCounterStoreState(rootState);
  const persistableState: ICounterStorePersistableState = {
    count: state.count
  }
  return persistableState;
}