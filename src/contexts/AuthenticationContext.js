import { createContext, useEffect, useState } from "react";
export const AuthenticationContext = createContext();

export function AuthenticationProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function checkLoggedIn() {
      try {
        const response = await fetch("http://localhost:5050/authentication/", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          localStorage.removeItem("loggedInUser");
          setIsLoggedIn(false);
        }

        if (response.status === 400) {
          localStorage.removeItem("loggedInUser");
          setIsLoggedIn(false);
        }

        if (response.status === 200) {
          const responseObject = await response.json();
          localStorage.setItem("loggedInUser", JSON.stringify(responseObject));
          setIsLoggedIn(true);
        }
      } catch (FetchError) {
        localStorage.removeItem("loggedInUser");
        console.log(FetchError);
        setIsLoggedIn(false);
      }
      setLoading(false);
    }
    checkLoggedIn();
  }, []);

  if (loading) {
    return (
      <section className="mainSection">
        <h3>Loading...</h3>
      </section>
    );
  }

  return (
    <AuthenticationContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
