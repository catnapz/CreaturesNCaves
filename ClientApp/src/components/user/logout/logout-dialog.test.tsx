import {
  cleanup,
  render,
  wait,
  getByText,
  fireEvent,
} from "@testing-library/react";
import React from "react";
import * as ReactRedux from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import * as authStore from "../auth/auth-store.slice";
import { MockedProvider as MockApolloProvider } from "@apollo/react-testing";

import { LogoutDialog } from "./logout-dialog";
import { UserManager } from "oidc-client";
import { StaticRouter } from "react-router";
import { AuthProvider } from "../auth/auth-provider";

import { mockSignoutRedirectFn, mockOidcClient } from '../../../testUtils/mocks/oidc-client.mock';
import { ApplicationPaths } from "../auth/api-auth-constants";

mockOidcClient();

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const store = configureStore({
  reducer: {
    [authStore.AUTH_STORE_FEATURE_KEY]: authStore.authStoreReducer,
  },
});

function wrappedRender(componentToRender: JSX.Element) {
  return render(
    <ReactRedux.Provider store={store}>
      <StaticRouter>
        <AuthProvider userManager={new UserManager({})}>
          <MockApolloProvider>{componentToRender}</MockApolloProvider>
        </AuthProvider>
      </StaticRouter>
    </ReactRedux.Provider>
  );
}

const mockOnClose = jest.fn();

describe("LogoutDialog", () => {
  const props = {
    open: true,
    onClose: mockOnClose,
  };

  afterEach(() => {
    cleanup();
    mockOnClose.mockClear();
    mockSignoutRedirectFn.mockClear();
    mockHistoryPush.mockClear();
  });

  it("should render successfully", () => {
    const { baseElement } = wrappedRender(<LogoutDialog {...props} />);
    getByText(baseElement, "Logout Confirmation.");
  });

  it("should do nothing, except close menu, when declined", async () => {
    const { baseElement } = wrappedRender(<LogoutDialog {...props} />);
    fireEvent.click(
      getByText(baseElement, (content, element) => {
        return element.tagName.toLowerCase() === "button" && element.classList.contains("logout-cancel-button");
      })
    );

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should logout redirect when accepted", async () => {
    const { baseElement } = wrappedRender(<LogoutDialog {...props} />);
    fireEvent.click(
      getByText(baseElement, (content, element) => {
        return element.tagName.toLowerCase() === "button" && element.classList.contains("logout-button");
      })
    );
    expect(mockHistoryPush).toHaveBeenCalledWith(ApplicationPaths.LogOutCallback);
  });

  afterAll(() => {
    mockSignoutRedirectFn.mockRestore();
    mockOnClose.mockRestore();
  });
});
