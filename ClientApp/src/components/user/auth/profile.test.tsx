import { cleanup, render, wait, getByText, fireEvent } from "@testing-library/react";
import React from "react";
import * as ReactRedux from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import * as authStore from "./auth-store.slice";

import { Profile as ProfileComponent } from "../profile/profile";
import { Profile as IProfile, UserManager } from "oidc-client";

const handleMenuButtonClickMock = jest.fn();
const selectUserProfileSpy = jest.spyOn(authStore, "selectUserProfile");
const confirmSpy = jest.spyOn(window, 'confirm').mockImplementation(() => false);

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

function wrappedRender(componentToRender: React.ReactNode) {
  return render(
    <ReactRedux.Provider store={store}>
      {componentToRender}
    </ReactRedux.Provider>
  )
}

describe('Profile', () => {

  afterEach(() => {
    cleanup();
    mockSignoutRedirect.mockClear();
    handleMenuButtonClickMock.mockClear();
    selectUserProfileSpy.mockClear();
    confirmSpy.mockClear();
  });

  it('should render successfully', async () => {
    selectUserProfileSpy.mockReturnValue({preferred_username: "Test User"} as IProfile)
    const { baseElement } = wrappedRender(
      <ProfileComponent userManager={new UserManager({})}/>
    );
    await wait(() => getByText(baseElement, "Hello Test User"));
  });

  it('should prompt a window confirm when profile delete', () => {
    selectUserProfileSpy.mockReturnValue({preferred_username: "Test User"} as IProfile)
    const { baseElement } = wrappedRender(
      <ProfileComponent userManager={new UserManager({})}/>
    );
    fireEvent.click(getByText(baseElement, "Delete Account"));
    expect(confirmSpy).toHaveBeenCalledWith("Are you sure you want to delete your account?");
  });

  it('should call a signout from UserManager', () => {
    (global as any)['fetch'] = jest.fn().mockResolvedValue({ ok: true });
    confirmSpy.mockImplementation(() => true);
    
    selectUserProfileSpy.mockReturnValue({preferred_username: "Test User"} as IProfile)
    const { baseElement } = wrappedRender(
      <ProfileComponent userManager={new UserManager({})}/>
    );
    fireEvent.click(getByText(baseElement, "Delete Account"));
    delete (global as any)['fetch'];
  });

  it('should not call a signout from UserManager', () => {
    (global as any)['fetch'] = jest.fn().mockResolvedValue({ ok: false });
    confirmSpy.mockImplementation(() => true);
    
    selectUserProfileSpy.mockReturnValue({preferred_username: "Test User"} as IProfile)
    const { baseElement } = wrappedRender(
      <ProfileComponent userManager={new UserManager({})}/>
    );
    fireEvent.click(getByText(baseElement, "Delete Account"));
    delete (global as any)['fetch'];
  });

  afterAll(() => {
    handleMenuButtonClickMock.mockRestore();
    mockSignoutRedirect.mockRestore();
    selectUserProfileSpy.mockRestore();
    confirmSpy.mockRestore();
  });

});