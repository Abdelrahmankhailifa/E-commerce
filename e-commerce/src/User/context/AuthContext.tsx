import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface AuthState {
  token: string | null;
  userId: number | null; // ✅ Added userId
  role: string | null;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
  login: (token: string, userId: number, role: string) => void; // ✅ Updated login function
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    // Load from localStorage on mount
    const storedAuth = localStorage.getItem("auth");
    return storedAuth
      ? JSON.parse(storedAuth)
      : { token: null, userId: null, role: null };
  });

  // Persist auth state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  // Login function to set token, userId, and role
  const login = (token: string, userId: number, role: string) => {
    setAuth({ token, userId, role });
    localStorage.setItem("auth", JSON.stringify({ token, userId, role })); // ✅ Store userId
  };

  // Logout function to clear auth state
  const logout = () => {
    setAuth({ token: null, userId: null, role: null });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
