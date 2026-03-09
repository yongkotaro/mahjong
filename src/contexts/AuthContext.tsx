import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import axios from "axios";

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Base API URL from environment - MUST be HTTPS in production
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Enable credentials globally for all axios requests
axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  // Restore user info from sessionStorage on refresh
  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Validate inputs on client side
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Invalid email format");
      }

      const res = await axios.post(
        `${API_URL}/auth/login`,
        { email, password }
      );

      setUser(email);
      sessionStorage.setItem("user", email);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    // Call backend to clear HttpOnly cookie
    axios.post(`${API_URL}/auth/logout`, {}).catch(() => { });
  };

  const register = async (email: string, username: string, password: string) => {
    try {
      // Client-side validation
      if (!email || !username || !password) {
        throw new Error("All fields are required");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Invalid email format");
      }
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }
      if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
        throw new Error("Password must contain letters and numbers");
      }

      await axios.post(`${API_URL}/auth/register`, {
        email,
        username,
        password
      });
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  };

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ user, register, login, logout }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
