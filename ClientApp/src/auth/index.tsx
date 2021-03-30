import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import AuthService, { User } from "./auth.service";
export { FirebaseAuthErrorCodes } from "./error-codes";

interface IAuthContext {
  user: User | null;
}

const AuthContext = createContext<IAuthContext>({ user: null });

const AuthProvider = (props: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    AuthService.subscribeToAuthChanges((currUser) => setUser(currUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthService };
export const useUser = () => useContext(AuthContext).user;
export const useIsAuthenticated = () => !!useContext(AuthContext).user;
