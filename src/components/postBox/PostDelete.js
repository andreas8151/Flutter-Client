import React from "react";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { getAllFeeds } from "../../functions/getAllFeeds";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { useParams } from "react-router-dom";
import ButtonIcon from "../buttons/ButtonIcon";
import { MdDeleteOutline } from "react-icons/md";

export default function PostDelete({ setFeeds, post }) {
  const { setIsLoggedIn } = useContext(AuthenticationContext);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { username } = useParams();

  useEffect(function () {
    if (localStorage.getItem("loggedInUser")) {
      setLoggedInUser(
        JSON.parse(localStorage.getItem("loggedInUser")).username
      );
    }
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
        const { feedList } = await getAllFeeds(username);
        setFeeds(feedList);
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
    <div className="postBox_postDelete">
      {username !== loggedInUser ? null : (
        <ButtonIcon
          className={"deletePost"}
          handleClick={() => deletePost(post._id)}
          icon={<MdDeleteOutline />}
        />
      )}
    </div>
  );
}
