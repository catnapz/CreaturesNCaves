import React from 'react';
import { useDispatch } from 'react-redux';
import { decrement } from './counter-store.slice';
import './decrementer.scss';
import { Button } from "../../button/button"
import {createNotification} from "../../layout/notifications/notifications";

export const Decrementer = () => {
  const dispatch = useDispatch();
  const dispatchDecrement = () => {
    dispatch(decrement());
    createNotification(dispatch, "Decremented!", "default");
  }
  return (
    <Button
      onClick={dispatchDecrement}
    >
      Decrement
    </Button>
  )
};
