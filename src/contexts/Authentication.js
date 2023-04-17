import { createContext, useEffect, useState } from "react";

export const AuthenticationContext = createContext();

export function AuthenticationProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(function () {
    if (!localStorage.getItem("isLoggedIn")) {
      setIsLoggedIn(false);
    } else {
      const checkAuthentication = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(JSON.parse(checkAuthentication));
    }
  }, []);

  return (
    <AuthenticationContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
