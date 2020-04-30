import React from 'react';
import { useDispatch } from 'react-redux';
import { counterStoreSlice } from './counter-store.slice';
import './incrementer.scss';
import Button from "@material-ui/core/Button";

export const Incrementer = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Button 
        variant="contained"
        color="primary"
        onClick={() => { dispatch(counterStoreSlice.actions.increment()) }}
      >
        Increment
      </Button>
    </>
  )
};
