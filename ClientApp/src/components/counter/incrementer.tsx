import React from 'react';
import { useDispatch } from 'react-redux';
import { counterStoreSlice } from './counter-store.slice';
import './incrementer.scss';

export const Incrementer = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => { dispatch(counterStoreSlice.actions.increment()) }}>
        Increment
      </button>
    </>
  )
};
