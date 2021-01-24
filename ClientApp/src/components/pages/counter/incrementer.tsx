import React from 'react';
import { useDispatch } from 'react-redux';
import { counterStoreSlice } from './counter-store.slice';
import { createNotification } from '../../layout/notifications/notifications';
import './incrementer.scss';
import Button from "@material-ui/core/Button";

export const Incrementer = () => {
  const dispatch = useDispatch();
  
  const increment = () => {
    dispatch(counterStoreSlice.actions.increment());
    createNotification(dispatch, "Incremented", "success");
  }

  return (
    <>
      <Button 
        variant="contained"
        color="primary"
        onClick={increment}
      >
        Increment
      </Button>
    </>
  )
};
