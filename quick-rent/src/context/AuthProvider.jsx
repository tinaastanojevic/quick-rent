import { useState, useEffect, useRef } from "react";
import { AuthContext } from "./AuthContext";
import { loginUser, registerUser } from "../services/UserService";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState("");
  const [token, setToken] = useState(localStorage.getItem("jwt_token") || null);

  const logoutTimeoutRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);

      const payload = parseToken(token);
      setRoles(payload?.role || "");
      scheduleAutoLogout(token);

      return () => {
        if (logoutTimeoutRef.current) {
          clearTimeout(logoutTimeoutRef.current);
        }
      };
    }
  }, []);

  const parseToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  const scheduleAutoLogout = (token) => {
    const payload = parseToken(token);
    if (!payload?.exp) return;

    const expiresIn = payload.exp * 1000 - Date.now();

    if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);

    if (expiresIn <= 0) {
      logout();
    } else {
      logoutTimeoutRef.current = setTimeout(() => {
        logout();
        logoutTimeoutRef.current = null;
      }, expiresIn);
    }
  };

  const login = async (email, password) => {
    let userData = await loginUser(email, password);
    initializeUserSession(userData);
  };
  const register = async (data) => {
    let userData = await registerUser(data);
    initializeUserSession(userData);
  };

  const initializeUserSession = (userData) => {
    localStorage.setItem("jwt_token", userData.token);
    localStorage.setItem(
      "user",
      JSON.stringify({ id: userData.id, username: userData.username })
    );

    setUser({ id: userData.id, username: userData.username });
    setIsLoggedIn(true);
    const payload = parseToken(userData.token);
    setRoles(payload?.role || "");
    scheduleAutoLogout(userData.token);
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user");
    setRoles("");
    setUser(null);
    setIsLoggedIn(false);

    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current);
      logoutTimeoutRef.current = null;
    }

    alert("Logout successful");
  };

  const updateToken = (token) => {
    localStorage.setItem("jwt_token", token);
    setToken(token);
    const payload = parseToken(token);
    setRoles(payload?.role || "");
  };

  const getUserId = () => (user ? user.id : null);
  const getUsername = () => (user ? user.username : null);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        register,
        user,
        roles,
        getUserId,
        getUsername,
        token,
        updateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
