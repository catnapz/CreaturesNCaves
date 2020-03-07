import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectCount } from './counter-store.slice';
import { Incrementer } from './incrementer';
import { Decrementer } from './decrementer';
import './counter.scss';

export const Counter = () => {
  const count = useSelector(selectCount);
  return (
    <>
        <div>
          <header>
            Counter
          </header>

          <div>
            <p>Current_count: <strong>{count}</strong></p>
            <Incrementer />
            <Decrementer />
          </div>
        </div>
      </>
  );  
};

