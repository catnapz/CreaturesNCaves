import React from 'react';
import { cleanup, getByText, render, wait } from '@testing-library/react';
import * as ReactRedux from "react-redux";
import { StaticRouter } from 'react-router'
import { configureStore } from '@reduxjs/toolkit';
import { UserManager } from "oidc-client";
import * as authStore from '../src/components/auth/auth-store.slice';
import { App, AppProps } from './app';

jest.mock('oidc-client', () => ({
  UserManager: jest.fn(() => ({}))
}));
const loadedMock = jest.fn();
const loadingMock = jest.fn();
const selectUserLoadingSpy = jest.spyOn(authStore, "selectUserLoading");

// Test setup
const store = configureStore({
  reducer: {
    [authStore.AUTH_STORE_FEATURE_KEY]: authStore.authStoreReducer,
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

describe('App', () => {
  let appProps: AppProps;

  beforeEach(() => {
    appProps = {
      loading: loadingMock,
      loaded: loadingMock,
      userManager: new UserManager({})
    }
  });

  afterEach(() => {
    cleanup();
    loadedMock.mockClear();
    loadingMock.mockClear();
    selectUserLoadingSpy.mockClear();
  });

  it('renders successfully', async () => {
    const { baseElement } = wrappedRender(<App {...appProps}/>);
    await wait(() => getByText(baseElement, "Creatures & Caves"));
  });

  it('renders nothing when loading', async () => {
    selectUserLoadingSpy.mockReturnValue(true);
    const { baseElement } = wrappedRender(<App {...appProps}/>);
    expect(baseElement.childElementCount).toBe(1);
    expect(baseElement.firstElementChild?.tagName.toLowerCase()).toBe("div");
    expect(baseElement.firstElementChild?.childElementCount).toBe(0);
  });
  
  afterAll(() => {
    loadedMock.mockRestore();
    loadingMock.mockRestore();
    selectUserLoadingSpy.mockRestore();
    jest.restoreAllMocks();
  });

});
