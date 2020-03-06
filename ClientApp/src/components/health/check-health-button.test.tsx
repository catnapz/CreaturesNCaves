/** 
 * Unit tests for CheckHealthButton
 * Note: Used to figure out how to test React-redux
 */

import { cleanup, fireEvent, getByText, render, wait } from '@testing-library/react';
import React from 'react';
import * as ReactRedux from 'react-redux';
import { CheckHealthButton } from './check-health-button';
import { HEALTH_STORE_FEATURE_KEY, healthStoreReducer } from './health-store.slice';
import { configureStore } from '@reduxjs/toolkit';
import { StaticRouter } from 'react-router';

const mockDispatch = jest.fn();
const useDispatchSpy = jest.spyOn(ReactRedux, "useDispatch").mockImplementation(() => mockDispatch);

// Test setup
const store = configureStore({
  reducer: {
    [HEALTH_STORE_FEATURE_KEY]: healthStoreReducer,
  }
});

function wrappedRender(componentToRender: React.ReactNode) {
  return render(
    <ReactRedux.Provider store={store}>
      <StaticRouter>
        {componentToRender}
      </StaticRouter>
    </ReactRedux.Provider>)
}

describe('CheckHealthButton', () => {

  afterEach(() => {
    cleanup();
    useDispatchSpy.mockClear();
  });


  it('should have button with text', async () => {
    const { baseElement } = wrappedRender(<CheckHealthButton />);
    await wait(() => getByText(baseElement, (content, element) => {
      return element.tagName.toLowerCase() === 'button' && content === 'Check Health';
    }));
  });

  it('should call dispatch on click', () => {
    const { baseElement } = wrappedRender(<CheckHealthButton />);
    fireEvent.click(getByText(baseElement, (content, element) => {
      return element.tagName.toLowerCase() === 'button' && content === 'Check Health';
    }));
    expect(mockDispatch).toHaveBeenCalled();
  });
});