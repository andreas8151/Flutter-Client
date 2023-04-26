import React, { useState, useEffect } from "react"; // useContext
import PostBox from "../components/postBox/PostBox";
import { getAllFeeds } from "../functions/getAllFeeds";
import { useParams } from "react-router-dom";
import "../sass/Profile.scss";

export default function Profile() {
  const { username } = useParams();
  const [postText, setPostText] = useState("");
  const [feeds, setFeeds] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [words, setWords] = useState(0);

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
    [username]
  );

  async function postFetch(event) {
    event.preventDefault();

    try {
      const result = await fetch("https://flutter-server.onrender.com/posts/add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ postText }),
        credentials: "include",
      });

      if (result.status === 200) {
        const { feedList } = await getAllFeeds(username);
        setFeeds(feedList);
        setPostText("");
        setWords(0);
        return;
      }
    } catch (error) {
      return { error: error };
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

  return (
    <section className="mainSection" id="profile">
      <div className="userProfile">
        <h2>{username}</h2>
        {username !== loggedInUser ? null : (
          <form className="addPostForm" onSubmit={postFetch}>
            <label className="addPostForm_heading" htmlFor="postText">
              Create Post
            </label>
            <div className="addPostForm_textBox">
              <span className="addPostForm_textBox_words">{words} / 500</span>
              <textarea
                className="addPostForm_textBox_textarea"
                id="postText"
                maxLength={500}
                rows={4}
                placeholder="Post text..."
                value={postText}
                onChange={(event) => {
                  setPostText(event.target.value);
                  setWords(event.target.textLength);
                }}
                required
              />
            </div>
            <button className="addPostForm_button" type="submit">
              Submit
            </button>
          </form>
        )}
      </div>

      {feeds === "noPosts" ? (
        <div className="noPosts">
          {username !== loggedInUser ? (
            <h3>{username} have not posted anything yet!</h3>
          ) : (
            <h3>You have not posted anything yet!</h3>
          )}
        </div>
      ) : (
        <div className="profilePosts">
          {feeds.map(function (post, index) {
            return <PostBox key={index} post={post} setFeeds={setFeeds} />;
          })}
        </div>
      )}
    </section>
  );
}
