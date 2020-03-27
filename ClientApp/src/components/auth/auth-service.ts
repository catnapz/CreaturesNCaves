import { EnhancedStore } from "@reduxjs/toolkit"
import { initializeUserManager } from "./auth-store.slice";

export const initUserManager = (store: EnhancedStore) => {
  (store.dispatch as any)(initializeUserManager());
};

export const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(atob(base64));
};

export const navigateToUrl = (url: string) => {
  window.location.replace(url);
}
