import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

export default function Feed() {
  const [feeds, setFeeds] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthenticationContext);

  useEffect(function () {
    async function getFeeds() {}
    getFeeds();
  });

  if (!isLoggedIn) {
    return (
      <section className="mainSection">
        <h2>Please login to access your feeds</h2>
      </section>
    );
  }

  return <section className="mainSection"></section>;
}
