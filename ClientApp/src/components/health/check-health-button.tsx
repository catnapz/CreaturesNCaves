import * as React from 'react';
import { useDispatch } from 'react-redux';
import { checkHealth } from './health-store.slice';
import Button from '@material-ui/core/Button';

export const CheckHealthButton = () => {
  const dispatch = useDispatch();
  
  return (
    <>
      <Button
        variant="contained"
        className="button"
        onClick={ () => { dispatch(checkHealth()) } }
      >
        Check Health
      </Button>
    </>
  );  
};

