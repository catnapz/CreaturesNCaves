import { cleanup, render, wait, getByText, fireEvent } from "@testing-library/react";
import React from "react";
import * as ReactRedux from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import * as authStore from "../auth/auth-store.slice";
import { StaticRouter } from 'react-router';

import { ApiAuthorizationRoutes } from "./api-auth-routes";
import { UserManager } from "oidc-client";

const mockSignoutRedirect = jest.fn();
jest.mock('oidc-client', () => ({
  UserManager: jest.fn(() => ({
    signoutRedirect: mockSignoutRedirect
  }))
}));

const store = configureStore({
  reducer: {
    [authStore.AUTH_STORE_FEATURE_KEY]: authStore.authStoreReducer,
  }
});

function wrappedRender(componentToRender: JSX.Element) {
  return render(
    <ReactRedux.Provider store={store}>
      <StaticRouter>
        {componentToRender}
      </StaticRouter>
    </ReactRedux.Provider>
  )
}

describe('ApiAuthorizationRoutes', () => {

  afterEach(() => {
    cleanup();
  });

  it('should render successfully', async () => {
    const { baseElement } = wrappedRender(
      <ApiAuthorizationRoutes userManager={new UserManager({})} />
    );
  });

  afterAll(() => {
  });

});