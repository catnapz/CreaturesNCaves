import React from "react";
import { cleanup, render, wait, getByText, fireEvent } from "@testing-library/react";
import * as ReactRedux from "react-redux";
import { Decrementer } from "./decrementer";
import { configureStore } from '@reduxjs/toolkit';
import { COUNTER_STORE_FEATURE_KEY, counterStoreReducer } from './counter-store.slice';

const store = configureStore({
  reducer: { 
    [COUNTER_STORE_FEATURE_KEY]: counterStoreReducer
  }
});

function wrappedRender( componentToRender: JSX.Element ) {
  return render(<ReactRedux.Provider store={store}>{componentToRender}</ReactRedux.Provider>)
}

describe("Decrementer", () => {
  
  afterAll(() => {
    cleanup();
  });

  it("should render successfully", async () => {
    const { baseElement } = wrappedRender(<Decrementer />);
    await wait(() => getByText(baseElement, (content, element) => {
      return element.tagName.toLowerCase() === 'span' && content === 'Decrement';
    }));
  });

  it('should call decrement action', async () => {
    const { baseElement } = wrappedRender(<Decrementer />);

    expect(store.getState()[COUNTER_STORE_FEATURE_KEY].count).toBe(0);    

    fireEvent.click(getByText(baseElement, (content, element) => {
      return element.tagName.toLowerCase() === 'span' && content === 'Decrement';
    }));

    expect(store.getState()[COUNTER_STORE_FEATURE_KEY].count).toBe(-1);    
  });
  

});
