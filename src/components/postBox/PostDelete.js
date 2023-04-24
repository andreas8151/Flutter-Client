/* import React from "react";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { getAllFeeds } from "../../functions/getAllFeeds";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";

export default async function PostDelete({ setFeeds, showButtons, post }) {
  const { setIsLoggedIn } = useContext(AuthenticationContext);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(function () {
    setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")).username);
  }, []);

  async function deletePost(postID) {
    try {
      const response = await fetch("http://localhost:5050/posts/delete", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: postID }),
      });

      if (response.status === 401) {
        await Swal.fire({
          icon: "error",
          text: "Please login to be able to delete this post!",
        });
        localStorage.removeItem("loggedInUser");
        setIsLoggedIn(false);
      }
      if (response.status === 200) {
        const { loggedIn, feedList } = await getAllFeeds();
        await setIsLoggedIn(loggedIn);
        if (loggedIn) {
          setFeeds(feedList);
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
      <div className="delete_post">
        {showButtons && (
          <div className="postBox_buttons">
            <button
              onClick={() => deletePost(post._id)}
              className="delete_post_button"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}
 */
