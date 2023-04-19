import { createContext, useEffect, useState } from "react";
export const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(function () {}, []);

  if (loading) {
    <section className="mainSection">
      <h3>Loading...</h3>
    </section>;
  }

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
}
