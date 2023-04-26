import { createContext, useEffect, useState } from "react";
export const AuthenticationContext = createContext();

export function AuthenticationProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function checkLoggedIn() {
      try {
        const response = await fetch("https://flutter-server.onrender.com/authentication/", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          localStorage.removeItem("loggedInUser");
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        if (response.status === 400) {
          localStorage.removeItem("loggedInUser");
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        if (response.status === 200) {
          const responseObject = await response.json();
          localStorage.setItem("loggedInUser", JSON.stringify(responseObject));
          setIsLoggedIn(true);
          setLoading(false);
          return;
        }
      } catch (FetchError) {
        localStorage.removeItem("loggedInUser");
        setIsLoggedIn("serverError");
        setLoading(false);
        return;
      }
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

  if (isLoggedIn === "serverError") {
    return (
      <section className="mainSection">
        <div className="serverError">
          <h2>Failed to connect to server</h2>
          <h3
            className="serverError_refresh"
            onClick={() => {
              window.location.reload();
            }}
          >
            Click to refresh page or come back later!
          </h3>
        </div>
      </section>
    );
  }

  return (
    <AuthenticationContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
