import React, { useEffect, Dispatch } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar, VariantType } from 'notistack';
import { selectNotifications, INotification, removeNotification, NotificationAction, EnqueueNotificationAction, dismissNotification, enqueueNotification } from "./notification-store.slice";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from '@material-ui/icons/Clear';

let displayedIds: (string | number)[] = [];

export const Notifications = () => {

  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayedId = (id: string | number) => {
    displayedIds.push(id);
  };

  const removeDisplayedId = (toRemoveId: string | number) => {
      displayedIds = [...displayedIds.filter(id => toRemoveId !== id)];
  };

  useEffect(() => {
    notifications.forEach(({key, message, options, dismissed}: INotification) => {
      // dismiss notifications
      if (dismissed) {
        closeSnackbar(key);
      }

      // if already displayed, do nothing
      if(displayedIds.includes(key)) return;
      
      // display notification using notistack
      enqueueSnackbar(message, {
        key,
        ...options,

        onClose: (event, reason, key) => {
          if (options.onClose) {
            options.onClose(event, reason, key);
          }
        },

        onExited: (elem, key) => {
          let actionPayload: NotificationAction = {key};
          dispatch(removeNotification(actionPayload));
          removeDisplayedId(key);
        }
      });

      // track snackbars being displayed
      storeDisplayedId(key);
    })
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
};

export const createNotification = (dispatch: Dispatch<any>, message: string, variant: VariantType) => {
  const notificationKey = new Date().getTime() + Math.random();
  const enqueueActionPayload: EnqueueNotificationAction = {
    notification: {
      dismissed: false,
      message: message,
      key: notificationKey,
      options: {
        key: notificationKey,
        variant: variant,
        action: (key) => {
          const dismissActionPayload: NotificationAction = { key };
          return (
            <IconButton
              onClick={() =>
                dispatch(dismissNotification(dismissActionPayload))
              }
            >
              <ClearIcon/>
            </IconButton>
          );
        },
      },
    },
  };
  dispatch(enqueueNotification(enqueueActionPayload));
}