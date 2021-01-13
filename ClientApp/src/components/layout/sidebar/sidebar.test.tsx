import { cleanup, render, waitFor, getByText } from "@testing-library/react";
import React from "react";
import * as ReactRedux from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import * as authStore from "../../user/auth/auth-store.slice";

import { Sidebar } from "./sidebar";

jest.mock('./sidebar-item', () => ({
  SidebarItem: 'mocked-sidebar-item'
}));

jest.mock('./sidebar-category', () => ({
  SidebarCategory: 'mocked-sidebar-category'
}));

const handleDrawerCloseMock = jest.fn();

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

describe('Sidebar', () => {

  afterEach(() => {
    cleanup();
    handleDrawerCloseMock.mockClear();
  });

  it('renders successfully', async () => {
    const { baseElement } = wrappedRender(
      <Sidebar 
        handleDrawerClose={handleDrawerCloseMock}
        isDrawerOpen={true}
      />
    );
    await waitFor(() => getByText(baseElement as HTMLElement, (content, element) => {
      return element!.attributes.getNamedItem("title")?.value === "Quick Tools"
    }));
  });

  /*
  it('renders authenticated categories successfully', async () => {
    selectAuthenticatedSpy.mockReturnValue(true);

    const { baseElement } = wrappedRender(
      <Sidebar 
        handleDrawerClose={handleDrawerCloseMock}
        isDrawerOpen={true}
      />
    );
    await waitFor(() => getByText(baseElement as HTMLElement, (content, element) => {
      return element!.attributes.getNamedItem("title")?.value === "Game Master"
    }));
  });
  */
  afterAll(() => {
    handleDrawerCloseMock.mockRestore();
  });

});