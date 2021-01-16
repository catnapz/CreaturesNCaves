import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectCount } from './counter-store.slice';
import { Incrementer } from './incrementer';
import { Decrementer } from './decrementer';
import './counter.scss';
import Typography from "@material-ui/core/Typography";

export const Counter = () => {
  const count = useSelector(selectCount);
  return (
    <>
      <Typography>Current count: <strong>{count}</strong></Typography>
      <div className="counter-buttons-container">
        <Incrementer />
        <Decrementer />
      </div>
    </>
  );  
};

