import { cleanup, render, wait, getByText } from "@testing-library/react";
import React from "react";
import * as ReactRedux from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import * as authStore from "../../user/auth/auth-store.slice";

import { SideBar } from "./sidebar";

jest.mock('./side-bar-item', () => ({
  SideBarItem: 'mocked-side-bar-item'
}));

jest.mock('./side-bar-category', () => ({
  SideBarCategory: 'mocked-side-bar-category'
}));

const handleDrawerCloseMock = jest.fn();
const selectAuthenticatedSpy = jest.spyOn(authStore, "selectAuthenticated");

// Test setup
const store = configureStore({
  reducer: {
    [authStore.AUTH_STORE_FEATURE_KEY]: authStore.authStoreReducer,
  }
});

function wrappedRender(componentToRender: React.ReactNode) {
  return render(
    <ReactRedux.Provider store={store}>
      {componentToRender}
    </ReactRedux.Provider>
  )
}

describe('SideBar', () => {

  afterEach(() => {
    cleanup();
    handleDrawerCloseMock.mockClear();
    selectAuthenticatedSpy.mockClear();
  });

  it('renders successfully', async () => {
    const { baseElement } = wrappedRender(
      <SideBar 
        handleDrawerClose={handleDrawerCloseMock}
        isDrawerOpen={true}
      />
    );
    await wait(() => getByText(baseElement, (content, element) => {
      return element.attributes.getNamedItem("title")?.value === "Quick Tools"
    }));
  });

  it('renders authenticated categories successfully', async () => {
    selectAuthenticatedSpy.mockReturnValue(true);

    const { baseElement } = wrappedRender(
      <SideBar 
        handleDrawerClose={handleDrawerCloseMock}
        isDrawerOpen={true}
      />
    );
    await wait(() => getByText(baseElement, (content, element) => {
      return element.attributes.getNamedItem("title")?.value === "Game Master"
    }));
  });

  afterAll(() => {
    handleDrawerCloseMock.mockRestore();
    selectAuthenticatedSpy.mockRestore();
  });

});