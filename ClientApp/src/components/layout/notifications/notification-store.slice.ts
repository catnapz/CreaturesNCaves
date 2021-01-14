import {
  createSlice,
  createSelector,
  PayloadAction
} from "@reduxjs/toolkit";
import { OptionsObject } from 'notistack';

export const NOTIFICATION_STORE_FEATURE_KEY = "notificationStore";

export interface INotification {
  key: string | number;
  message: string;
  options: OptionsObject;
  dismissed: boolean;
}

export interface INotificationStoreState {
  notifications: INotification[];
}

export const initialNotificationStoreState: INotificationStoreState = {
  notifications: []
};

export interface NotificationAction {
  key: string | number;
}

export interface EnqueueNotificationAction {
  notification: INotification;
}


export const notificationStoreSlice = createSlice({
  name: NOTIFICATION_STORE_FEATURE_KEY,
  initialState: initialNotificationStoreState as INotificationStoreState,
  reducers: {
    enqueueNotification: (state, action: PayloadAction<EnqueueNotificationAction>) => {
      (state as INotificationStoreState).notifications.push(action.payload.notification)
    } ,

    dismissNotification: (state, action: PayloadAction<NotificationAction>) => {
      state.notifications = state.notifications.map(notification => (
        ( notification.key === action.payload.key ) ? {
          ...notification,
          dismissed: true
        } : {
          ...notification
        }
      ))
    },

    removeNotification: (state, action: PayloadAction<NotificationAction>) => {
      state.notifications = state.notifications.filter(notification => notification.key !== action.payload.key);
    }
  }
});

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * const dispatch = useDispatch();
 * dispatch(getNotificationStoreSuccess([{ id: 1 }]));
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const {
  enqueueNotification,
  dismissNotification,
  removeNotification
} = notificationStoreSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * const count = useSelector(selectNotificationStoreNotifications);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
export const getNotificationStoreState = (rootState: any): INotificationStoreState =>
  rootState[NOTIFICATION_STORE_FEATURE_KEY];

export const selectNotifications = createSelector(
  getNotificationStoreState,
  s => s.notifications
);

/*
 * Export reducer for store configuration.
 */
export const notificationStoreReducer = notificationStoreSlice.reducer;
