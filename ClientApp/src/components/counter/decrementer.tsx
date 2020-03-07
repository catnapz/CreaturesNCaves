import React from 'react';
import { useDispatch } from 'react-redux';
import { counterStoreSlice } from './counter-store.slice';
import './decrementer.scss';

export const Decrementer = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => { dispatch(counterStoreSlice.actions.decrement()) }}>
        Decrement
      </button>
    </>
  )
};
