import { cleanup, render, wait, getByText, fireEvent } from "@testing-library/react";
import React from "react";
import * as ReactRedux from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import * as authStore from "../auth/auth-store.slice";
import { MockedProvider } from '@apollo/react-testing';

import { LogoutMenu } from "./logout-menu";
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
      <MockedProvider>
        {componentToRender}
      </MockedProvider>
    </ReactRedux.Provider>
  )
}

describe('LogoutMenu', () => {

  afterEach(() => {
    cleanup();
    mockSignoutRedirect.mockClear();
  });

  it('should render successfully', async () => {
    const { baseElement } = wrappedRender(
      <LogoutMenu userManager={new UserManager({})}/>
    );
    await wait(() => getByText(baseElement, "Logout?"));
  });

  it('should redirect to \'/\' when declined', async () => {
    const { baseElement } = wrappedRender(
      <LogoutMenu userManager={new UserManager({})}/>
    );

    fireEvent.click(getByText(baseElement, (content, element) => {
      return element.tagName.toLowerCase() === 'button' && content === 'No';
    }));

    expect(window.location.pathname).toBe('/');
  });

  it('should call logout when accepted', async () => {
    const { baseElement } = wrappedRender(
      <LogoutMenu userManager={new UserManager({})}/>
    );

    fireEvent.click(getByText(baseElement, (content, element) => {
      return element.tagName.toLowerCase() === 'button' && content === 'Yes';
    }));

    expect(window.location.pathname).toBe('/');
  });

  afterAll(() => {
    mockSignoutRedirect.mockRestore();
  });

});