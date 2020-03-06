import * as _ from 'lodash';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { getFromLocalState, saveToLocalState } from './persistStore';
import { HEALTH_STORE_FEATURE_KEY, healthStoreReducer } from '../components/health/health-store.slice';
import { COUNTER_STORE_FEATURE_KEY, counterStoreReducer, initialCounterStoreState, getCounterStorePersistableState } from '../components/counter/counter-store.slice';


// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
export const history = createBrowserHistory({ basename: baseUrl });

// Configure the middleware
const middleware = [
  thunk,
  routerMiddleware(history)
];

// Initialize the Application state
const initialStoreState: any = {
  [COUNTER_STORE_FEATURE_KEY]: getFromLocalState(COUNTER_STORE_FEATURE_KEY) ?? initialCounterStoreState,
};

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
let reducers = {
  router: connectRouter(history),
  // Merge in slice info
  [COUNTER_STORE_FEATURE_KEY]: counterStoreReducer,
  [HEALTH_STORE_FEATURE_KEY]: healthStoreReducer,
};

const enhancers = [];
const windowIfDefined = typeof window === 'undefined' ? null : window as any;
if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
}

// Get the application-wide store instance, prepopulating with state from the server where available.
export const ReduxStore = configureStore({
  devTools: true,
  reducer: reducers as any,
  middleware: middleware,
  preloadedState: initialStoreState,
  enhancers: enhancers
});

const throttleMs = 1000;

ReduxStore.subscribe(_.throttle(() => {
  saveToLocalState(COUNTER_STORE_FEATURE_KEY, getCounterStorePersistableState(ReduxStore.getState()));
}, throttleMs));