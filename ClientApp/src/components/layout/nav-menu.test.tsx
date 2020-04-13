import { cleanup, render, wait, getByText } from "@testing-library/react";
import React from "react";
import * as ReactRedux from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { StaticRouter } from 'react-router';
import * as authStore from "../auth/auth-store.slice";

import { NavMenu } from "./nav-menu";
import { Profile } from "oidc-client";

const handleMenuButtonClickMock = jest.fn();
const selectAuthenticatedSpy = jest.spyOn(authStore, "selectAuthenticated");
const selectUserProfileSpy = jest.spyOn(authStore, "selectUserProfile");

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

describe('NavMenu', () => {

  afterEach(() => {
    cleanup();
    handleMenuButtonClickMock.mockClear();
    selectAuthenticatedSpy.mockClear();
    selectUserProfileSpy.mockClear();
  });

  it('renders successfully', async () => {
    const { baseElement } = wrappedRender(
      <NavMenu 
        handleMenuButtonClick={handleMenuButtonClickMock}
        isDrawerOpen={true}
      />
    );
    await wait(() => getByText(baseElement, "Creatures & Caves"));
  });

  it('renders authenticated view successfully', async () => {
    selectAuthenticatedSpy.mockReturnValue(true);
    selectUserProfileSpy.mockReturnValue({name: "test user"} as Profile);

    const { baseElement } = wrappedRender(
      <NavMenu 
        handleMenuButtonClick={handleMenuButtonClickMock}
        isDrawerOpen={true}
      />
    );
    await wait(() => getByText(baseElement, "Hello test user"));
  });

  afterAll(() => {
    handleMenuButtonClickMock.mockRestore();
    selectAuthenticatedSpy.mockRestore();
    selectUserProfileSpy.mockRestore();
  });

});