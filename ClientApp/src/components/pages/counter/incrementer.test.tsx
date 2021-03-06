import React from "react";
import { cleanup, render, waitFor, getByText, fireEvent } from "@testing-library/react";
import * as ReactRedux from "react-redux";
import { Incrementer } from "./incrementer";
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

describe("Incrementer", () => {
  
  afterEach(() => {
    cleanup();
  });

  it("should render successfully", async () => {
    const { baseElement } = wrappedRender(<Incrementer />);
    await waitFor(() => getByText(baseElement as HTMLElement, (content, element) => {
      return element!.tagName.toLowerCase() === 'span' && content === 'Increment';
    }));
  });

  it('should call increment action', async () => {
    const { baseElement } = wrappedRender(<Incrementer />);
    expect(store.getState()[COUNTER_STORE_FEATURE_KEY].count).toBe(0);    

    fireEvent.click(getByText(baseElement as HTMLElement, (content, element) => {
      return element!.tagName.toLowerCase() === 'span' && content === 'Increment';
    }));

    expect(store.getState()[COUNTER_STORE_FEATURE_KEY].count).toBe(1);    
  });

});
