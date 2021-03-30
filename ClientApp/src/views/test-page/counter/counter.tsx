import React from "react";
import { useAppSelector } from "../../../store/hooks";
import { selectCount } from "./counter.store-slice";
import { Decrementer, Incrementer } from "./components";

const Counter = () => {
  const count = useAppSelector(selectCount);
  // Alternatively:
  // The `state` arg is correctly typed as `RootState` already
  // const count = useAppSelector((state) => state.counter.value);
  return (
    <div>
      <div>
        <Incrementer />
        <Decrementer />
      </div>
      <span>Current Count: {count}</span>
    </div>
  );
};

export default Counter;
