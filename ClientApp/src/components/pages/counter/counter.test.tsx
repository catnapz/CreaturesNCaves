import React from "react";
import { render, waitFor, getByText, cleanup } from "@testing-library/react";
import * as ReactRedux from "react-redux";
import { Counter } from "./counter";
import { configureStore } from '@reduxjs/toolkit';
import { COUNTER_STORE_FEATURE_KEY, counterStoreReducer } from './counter-store.slice';

jest.mock('./incrementer', () => ({
  Incrementer: 'mocked-incrementer'
}));

jest.mock('./decrementer', () => ({
  Decrementer: 'mocked-decrementer'
}));

const store = configureStore({
  reducer: { 
    [COUNTER_STORE_FEATURE_KEY]: counterStoreReducer
  }
});

function wrappedRender( componentToRender: JSX.Element ) {
  return render(<ReactRedux.Provider store={store}>{componentToRender}</ReactRedux.Provider>)
}

describe("Counter", () => {

  afterEach(() => {
    cleanup();
  });

  it("should render successfully", async () => {
    const { baseElement } = wrappedRender(<Counter />);    
    await waitFor(() => getByText(baseElement as HTMLElement, "count", {exact: false}));
  });
});
