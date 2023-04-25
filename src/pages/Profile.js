import React, { useContext, useState, useEffect } from "react"; // useContext
import PostBox from "../components/postBox/PostBox";
import { getAllFeeds } from "../functions/getAllFeeds";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { Link } from "react-router-dom";

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

  useEffect(
    function () {
      async function fetchAllFeeds() {
        const { loggedIn, feedList } = await getAllFeeds();
        await setIsLoggedIn(loggedIn);
        if (loggedIn) {
          setFeeds(feedList);
        }
      }
      fetchAllFeeds();
    },
    [setIsLoggedIn]
  );

  if (!isLoggedIn) {
    return (
      <section className="mainSection">
        <div className="notLoggedIn">
          <h2>Please login to access your feeds</h2>
          <h3>
            <Link to={"/login"}>Go back to homepage!</Link>
          </h3>
        </div>
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
          if (post.username === username) {
            return (
              <PostBox
                key={index}
                post={post}
                setFeeds={setFeeds}
                showButtons={true}
              />
            );
          } else {
            return <PostBox key={index} post={post} />;
          }
        })}
      </section>
    </>
  );
}
