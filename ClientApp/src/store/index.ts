import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

import counterReducer, {
  COUNTER_STORE_SLICE_KEY,
} from "../views/test-page/counter/counter.store-slice";

// Create browser history to use in the Redux store
export const history = createBrowserHistory();

// Configure the middleware
const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

const reducers = {
  router: connectRouter(history),
  [COUNTER_STORE_SLICE_KEY]: counterReducer,
};

const reduxStore = configureStore({
  reducer: reducers,
  middleware: middleware,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export default reduxStore;
