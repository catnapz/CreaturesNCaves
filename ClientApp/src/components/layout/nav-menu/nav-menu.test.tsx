import { cleanup, render, waitFor, getByText } from "@testing-library/react";
import React from "react";
import * as ReactRedux from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { StaticRouter } from 'react-router';
import * as authStore from "../../user/auth/auth-store.slice";

import { NavMenu } from "./nav-menu";

jest.mock('../../user/logout/logout-dialog', () => ({
  LogoutDialog: 'mocked-logout-dialog'
}));

const handleMenuButtonClickMock = jest.fn();

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
  });

  it('renders successfully', async () => {
    const { baseElement } = wrappedRender(
      <NavMenu 
        handleMenuButtonClick={handleMenuButtonClickMock}
        isDrawerOpen={true}
      />
    );
    await waitFor(() => getByText(baseElement as HTMLElement, "Creatures & Caves"));
  });
  
  afterAll(() => {
    handleMenuButtonClickMock.mockRestore();
  });

});