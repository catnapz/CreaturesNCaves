/** 
 * Unit tests for HealthDisplay
 * Note: Used to figure out how to test React-redux
 */

import { cleanup, fireEvent, getByText, render, wait } from '@testing-library/react';
import React from 'react';
import * as ReactRedux from 'react-redux';
import { HealthDisplay } from './health-display';
import * as HealthStoreSlice from './health-store.slice';
import { configureStore } from '@reduxjs/toolkit';
import { StaticRouter } from 'react-router';

jest.mock('./check-health-button', () => ({
  CheckHealthButton: 'mocked-check-health-button'
}));

const mockDispatch = jest.fn();
const useDispatchSpy = jest.spyOn(ReactRedux, "useDispatch").mockImplementation(() => mockDispatch);
const selectHealthCheckLoadingSpy = jest.spyOn(HealthStoreSlice, "selectHealthCheckLoading").mockReturnValue(false);
const selectHealthySpy = jest.spyOn(HealthStoreSlice, "selectHealthy").mockReturnValue(false);

// Test setup
const store = configureStore({
  reducer: {
    [HealthStoreSlice.HEALTH_STORE_FEATURE_KEY]: HealthStoreSlice.healthStoreReducer,
  }
});

function wrappedRender(componentToRender: React.ReactNode) {
  return render(
    <ReactRedux.Provider store={store}>
      <StaticRouter>
        {componentToRender}
      </StaticRouter>
    </ReactRedux.Provider>
  )
}

describe('HealthDisplay', () => {

  afterEach(() => {
    cleanup();
    useDispatchSpy.mockClear();
    mockDispatch.mockClear();
  });

  it('should display loading state', async () => {
    selectHealthCheckLoadingSpy.mockReturnValue(true);

    const { baseElement } = wrappedRender(<HealthDisplay />);
    await wait(() => getByText(baseElement, (content, element) => {
      return element.tagName.toLowerCase() === 'strong' && content === 'CHECKING';
    }));
  });

  it('should display Healthy', async () => {
    selectHealthCheckLoadingSpy.mockReturnValue(false);
    selectHealthySpy.mockReturnValue(true);

    const { baseElement } = wrappedRender(<HealthDisplay />);
    await wait(() => getByText(baseElement, (content, element) => {
      return element.tagName.toLowerCase() === 'strong' && content === 'HEALTHY';
    }));
  });

  it('should display Unhealthy', async () => {
    selectHealthCheckLoadingSpy.mockReturnValue(false);
    selectHealthySpy.mockReturnValue(false);

    const { baseElement } = wrappedRender(<HealthDisplay />);
    await wait(() => getByText(baseElement, (content, element) => {
      return element.tagName.toLowerCase() === 'strong' && content === 'UNHEALTHY';
    }));
  });

});