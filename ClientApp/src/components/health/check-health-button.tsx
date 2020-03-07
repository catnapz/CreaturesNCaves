import * as React from 'react';
import { useDispatch } from 'react-redux';
import { checkHealth } from './health-store.slice';

export const CheckHealthButton = () => {
  const dispatch = useDispatch();
  
  return (
    <>
        <button onClick={ () => { dispatch(checkHealth()) } }>
          Check Health
        </button>
      </>
  );  
};

