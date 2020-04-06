import React from 'react';
import { useDispatch } from 'react-redux';
import { counterStoreSlice } from './counter-store.slice';
import './decrementer.scss';
import Button from "@material-ui/core/Button";

export const Decrementer = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Button
        variant="contained"
        onClick={() => { dispatch(counterStoreSlice.actions.decrement()) }}
      >
        Decrement
      </Button>
    </>
  )
};
