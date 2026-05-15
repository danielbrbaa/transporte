import { createContext, useContext, useMemo, useState } from "react";

type AuthContextData = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextData);
const AUTH_KEY = "wls-cargo-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem(AUTH_KEY) === "true");

  const value = useMemo<AuthContextData>(() => ({
    isAuthenticated,
    login: (username: string, password: string) => {
      const valid = username.trim().toLowerCase() === "admin" && password === "123456";
      if (valid) {
        localStorage.setItem(AUTH_KEY, "true");
        setIsAuthenticated(true);
      }
      return valid;
    },
    logout: () => {
      localStorage.removeItem(AUTH_KEY);
      setIsAuthenticated(false);
    },
  }), [isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
