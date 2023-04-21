import { createContext, useEffect, useState } from "react";
import { getUsers } from "../functions/getUsers";
export const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function fetchUsers() {
      const usersList = await getUsers();
      setUsers(usersList);

      setLoading(false);
    }
    fetchUsers();
  }, []);

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
