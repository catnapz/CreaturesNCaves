export const mockSignoutRedirectFn = jest.fn();

export const mockOidcClient = () => {
  jest.mock("oidc-client", () => ({
    UserManager: jest.fn(() => ({
      signoutRedirect: mockSignoutRedirectFn,
      events: {
        addUserLoaded: () => {},
        addSilentRenewError: () => {},
        addAccessTokenExpired: () => {},
        addAccessTokenExpiring: () => {},
        addUserUnloaded: () => {},
        addUserSignedOut: () => {},
        removeUserLoaded: () => {},
        removeSilentRenewError: () => {},
        removeAccessTokenExpired: () => {},
        removeAccessTokenExpiring: () => {},
        removeUserUnloaded: () => {},
        removeUserSignedOut: () => {},
      },
    })),
  }));
};
