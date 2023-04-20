import { createContext, useEffect, useState } from "react";
export const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(
    function () {
      async function getUsers() {
        try {
          const response = await fetch("http://localhost:5050/users/allUsers", {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
            credentials: "include",
          });

          if (response.status === 404) {
            setUsers([]);
          }

          if (response.status === 200) {
            const serverObject = await response.json();
            setUsers(serverObject.users);
          }
        } catch (error) {
          setUsers(false);
        }
        setLoading(false);
      }
      getUsers();
    },
    [users]
  );

  if (loading) {
    return (
      <section className="mainSection">
        <h3>Loading...</h3>
      </section>
    );
  }

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
}
