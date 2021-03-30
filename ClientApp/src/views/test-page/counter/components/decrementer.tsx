import React from "react";
import { Button } from "../../../../components";
import { useAppDispatch } from "../../../../store/hooks";

import { decrement } from "../counter.store-slice";

const Decrementer = () => {
  const dispatch = useAppDispatch();
  return (
    <Button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
      Decrement
    </Button>
  );
};

export default Decrementer;
