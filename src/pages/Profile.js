import React, { useContext, useState, useEffect } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import PostBox from "../components/PostBox";

export default function Profile() {
  const [postText, setPostText] = useState("");
  const [feeds, setFeeds] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthenticationContext);

  const { username } = JSON.parse(localStorage.getItem("loggedInUser"));

  async function postFetch() {
    try {
      const result = await fetch("http://localhost:5050/posts/add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ postText }),
        credentials: "include",
      });
      const data = await result.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function () {
    getFeeds();
  }, []);

  async function getFeeds() {
    try {
      const response = await fetch(`http://localhost:5050/posts/${username}`, {
        method: "GET",
        credentials: "include",
      });

      console.log(response);
      const data = await response.json();
      console.log(data);

      setFeeds(data);
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
    <>
      <form onSubmit={postFetch}>
        <label>Post</label>
        <textarea
          onChange={(event) => setPostText(event.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>

      <section className="mainSection">
        {feeds.map(function (post, index) {
          console.log(post.username, username);
          if (post.username === username) {
            return <PostBox key={index} post={post} getFeeds={getFeeds} />;
          } else {
            return <PostBox key={index} post={post} />;
          }
        })}
      </section>
    </>
  );
}
