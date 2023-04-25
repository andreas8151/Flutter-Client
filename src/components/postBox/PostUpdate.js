import React from "react";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { getAllFeeds } from "../../functions/getAllFeeds";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { useParams } from "react-router-dom";
import ButtonIcon from "../buttons/ButtonIcon";
import { MdEdit, MdCancel } from "react-icons/md";

export default function PostUpdate({ setFeeds, post }) {
  const { setIsLoggedIn } = useContext(AuthenticationContext);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [postContent, setPostContent] = useState(post.postText);
  const { username } = useParams();

  const [showEdit, setShowEdit] = useState(false);

  useEffect(function () {
    if (localStorage.getItem("loggedInUser")) {
      setLoggedInUser(
        JSON.parse(localStorage.getItem("loggedInUser")).username
      );
    }
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
        const { feedList } = await getAllFeeds(username);
        setFeeds(feedList);
        setShowEdit(false);
        return;
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        text: "Something went wrong, failed to connect to server!",
      });
      setIsLoggedIn("serverError");
      return;
    }
  }

  return (
    <div className="postUpdate">
      {username !== loggedInUser ? null : (
        <div className="postBox_buttons">
          {showEdit ? (
            <ButtonIcon
              handleClick={(event) => setShowEdit(false)}
              icon={<MdCancel />}
            />
          ) : (
            <ButtonIcon
              handleClick={(event) => setShowEdit(true)}
              icon={<MdEdit />}
            />
          )}
        </div>
      )}
      {showEdit ? (
        <form>
          <textarea
            className="addCommentForm_textarea"
            onChange={(e) => setPostContent(e.target.value)}
            value={postContent}
          ></textarea>
          <button
            className="addCommentForm_button"
            onClick={(event) => updatePost(event, post._id)}
          >
            Edit Post
          </button>
        </form>
      ) : (
        <p className="postBox_description">{post.postText}</p>
      )}
    </div>
  );
}
