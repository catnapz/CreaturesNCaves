import {configureStore} from "@reduxjs/toolkit";
import {createBrowserHistory} from "history";

import counterReducer, {
  COUNTER_STORE_SLICE_KEY,
} from "../views/test-page/counter/counter.store-slice";

// Create browser history to use in the Redux store
export const history = createBrowserHistory();

const reducers = {
  [COUNTER_STORE_SLICE_KEY]: counterReducer,
};

const reduxStore = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export default reduxStore;
