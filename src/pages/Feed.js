import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import PostBox from "../components/PostBox";

export default function Feed() {
  const [feeds, setFeeds] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthenticationContext);

  useEffect(function () {
    getFeeds();
  });

  async function getFeeds() {
    try {
      const response = await fetch("http://localhost:5050/posts/following", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 401) {
        setIsLoggedIn(false);
        return;
      }

      if (response.status === 404) {
        const responseMessage = await response.json();
        return console.log(responseMessage.error);
      }

      if (response.status === 200) {
        const responseMessage = await response.json();
        return setFeeds(responseMessage.posts);
      }
    } catch (FetchError) {
      return console.log(FetchError);
    }
  }

  if (!isLoggedIn) {
    return (
      <section className="mainSection">
        <h2 className="notLoggedIn">Please login to access your feeds</h2>
      </section>
    );
  }

  return (
    <section className="mainSection">
      {feeds.map(function (post, index) {
        return <PostBox key={index} post={post} getFeeds={getFeeds} />;
      })}
    </section>
  );
}
