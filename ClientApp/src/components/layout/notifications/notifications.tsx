import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { selectNotifications, INotification, removeNotification, NotificationAction } from "./notification-store.slice";

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
          //ts-ignore
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
