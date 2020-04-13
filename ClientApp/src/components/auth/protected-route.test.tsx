import { cleanup, render, wait, getByText, fireEvent } from "@testing-library/react";
import React from "react";
import * as ReactRedux from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import * as authStore from "../auth/auth-store.slice";
import { StaticRouter } from 'react-router';

import { ProtectedRoute, ProtectedRouteProps } from "./protected-route";

const selectAuthenticatedSpy = jest.spyOn(authStore, "selectAuthenticated");

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

const TestComponent = () => (<p>test component</p>);

describe('ApiAuthorizationRoutes', () => {

  let props: ProtectedRouteProps = {
    component: TestComponent
  }

  afterEach(() => {
    cleanup();
    selectAuthenticatedSpy.mockReset();
  });

  it('should render successfully', async () => {
    wrappedRender(
      <ProtectedRoute {...props} />
    );
  });

  it('should render component when authenticated', async () => {
    selectAuthenticatedSpy.mockReturnValue(true);
    const { baseElement } = wrappedRender(
      <ProtectedRoute {...props} />
    );
    await wait(() => getByText(baseElement, "test component"));
  });

  afterAll(() => {
    selectAuthenticatedSpy.mockRestore();
  });

});