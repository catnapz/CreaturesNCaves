import React from "react";
import { Button } from "../../../../components";
import { useAppDispatch } from "../../../../store/hooks";

import { increment } from "../counter.store-slice";

const Incrementer = () => {
  const dispatch = useAppDispatch();
  return (
    <Button aria-label="Increment value" onClick={() => dispatch(increment())}>
      Increment
    </Button>
  );
};

export default Incrementer;
