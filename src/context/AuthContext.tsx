import { createContext, useState, useEffect, useCallback, type ReactNode } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  type RegisterData,
  type LoginData,
  type User,
} from "@/api/userService";
import { setAuthToken, removeAuthToken } from "@/utils/api";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getCurrentUser()
      .then((res) => {
        if (!cancelled) setUser(res.data);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (data: LoginData) => {
    const res = await loginUser(data);
    setAuthToken(res.data.access_token);
    const userRes = await getCurrentUser();
    setUser(userRes.data);
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    await registerUser(data);
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    removeAuthToken();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
