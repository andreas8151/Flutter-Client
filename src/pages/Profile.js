import React, { useState, useEffect } from "react"; // useContext
import PostBox from "../components/postBox/PostBox";
import { getAllFeeds } from "../functions/getAllFeeds";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [postText, setPostText] = useState("");
  const [feeds, setFeeds] = useState([]);

  const [loggedInUser, setLoggedInUser] = useState(null);

  const { username } = useParams();

  useEffect(function () {
    if (localStorage.getItem("loggedInUser")) {
      setLoggedInUser(
        JSON.parse(localStorage.getItem("loggedInUser")).username
      );
    }
  }, []);

  useEffect(
    function () {
      async function fetchAllFeeds() {
        const { feedList } = await getAllFeeds(username);
        setFeeds(feedList);
      }
      fetchAllFeeds();
    },
    [username, loggedInUser]
  );

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

  if (feeds === null) {
    return (
      <section className="mainSection">
        <div className="noPosts">
          <h2>{username}</h2>
          <h3>Loading...</h3>
        </div>
      </section>
    );
  }
  if (feeds === `${username}, have not posted anything yet!`) {
    return (
      <section className="mainSection">
        <div className="noPosts">
          <h2>{feeds}</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="mainSection">
      <h2>{username}</h2>

      {username !== loggedInUser ? null : (
        <form className="addCommentForm" onSubmit={postFetch}>
          <label className="addCommentForm_heading">Create Post</label>
          <textarea
            className="addCommentForm_textarea"
            onChange={(event) => setPostText(event.target.value)}
          ></textarea>
          <button className="addCommentForm_button" type="submit">
            Submit
          </button>
        </form>
      )}
      <div className="mainSection" id="feed">
        {feeds.map(function (post, index) {
          return <PostBox key={index} post={post} setFeeds={setFeeds} />;
        })}
      </div>
    </section>
  );
}
