import React, { createContext, useState, useEffect } from "react";

// Create Auth Context
export const AuthContext = createContext();

// AuthProvider Component
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: sessionStorage.getItem("token") ? true : false,
    token: sessionStorage.getItem("token") || null,
  });

  // Login Function
  const login = (token) => {
    sessionStorage.setItem("token", token);
    setAuth({ isAuthenticated: true, token });
  };

  // Logout Function
  const logout = () => {
    sessionStorage.removeItem("token");
    setAuth({ isAuthenticated: false, token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
