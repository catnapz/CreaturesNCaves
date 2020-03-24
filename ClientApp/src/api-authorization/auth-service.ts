import { EnhancedStore } from "@reduxjs/toolkit"
import { initializeUserManager } from "./auth-store.slice";

export const InitUserManager = (store: EnhancedStore) => {
  (store.dispatch as any)(initializeUserManager());
}