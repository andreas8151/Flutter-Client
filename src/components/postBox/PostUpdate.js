/* import React from "react";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { getAllFeeds } from "../../functions/getAllFeeds";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";

export default async function PostUpdate({ setFeeds, showButtons, post }) {
  const { setIsLoggedIn } = useContext(AuthenticationContext);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [postContent, setPostContent] = useState(post.content);

  useEffect(function () {
    setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")).username);
  }, []);

  async function updatePost(event, postID) {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5050/posts`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ postText: postContent, id: postID }),
      });

      if (response.status === 401) {
        await Swal.fire({
          icon: "error",
          text: "Please login to be able to edit posts!",
        });
        localStorage.removeItem("loggedInUser");
        setIsLoggedIn(false);
        return;
      }

      if (response.status === 200) {
        const { loggedIn, feedList } = await getAllFeeds();
        await setIsLoggedIn(loggedIn);
        if (loggedIn) {
          setFeeds(feedList);
          setPostContent("");
        }
        return;
      } else {
        const responseMessage = await response.text();
        Swal.fire({ icon: "error", text: responseMessage });
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        text: "Something went wrong, failed to connect to server!",
      });
      setIsLoggedIn("serverError");
    }
  }

  return (
    <>
      {showButtons && (
        <div className="update_post">
          <textarea
            className="update_post_textarea"
            onChange={(e) => setPostContent(e.target.value)}
            value={postContent}
          ></textarea>
          <button
            className="update_post_button"
            onClick={(event) => updatePost(event, post._id)}
          >
            Edit
          </button>
        </div>
      )}
    </>
  );
}
 */
