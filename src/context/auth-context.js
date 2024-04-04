import React, { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  cognitoId: null,
  mongoId: null,
  username: null,
  name: null,
  setContextState: () => {},
});

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    cognitoId: null,
    mongoId: null,
    username: null,
    name: null,
  });

  const setContextState = (newState) => {
    setAuthState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };
  return (
    <AuthContext.Provider value={{ ...authState, setContextState }}>
      {children}
    </AuthContext.Provider>
  );
};
