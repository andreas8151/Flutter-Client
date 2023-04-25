import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";
import ButtonIcon from "../buttons/ButtonIcon";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { getFeeds } from "../../functions/getFeeds";
import { useParams } from "react-router-dom";
import { getAllFeeds } from "../../functions/getAllFeeds";

export default function PostLikes({ post, setFeeds, redirect }) {
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

  async function likePost(postID) {
    try {
      const response = await fetch("http://localhost:5050/posts/like", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: postID }),
      });

      if (response.status === 401) {
        await Swal.fire({
          icon: "error",
          text: "Please login to be able to like a users post!",
        });
        localStorage.removeItem("loggedInUser");
        setIsLoggedIn(false);
        return;
      }
      if (response.status === 200) {
        if (username) {
          const { feedList } = await getAllFeeds(username);
          setFeeds(feedList);

          return;
        }
        const { loggedIn, feedList } = await getFeeds();
        await setIsLoggedIn(loggedIn);
        if (loggedIn) {
          setFeeds(feedList);
        }
        return;
      }
      const responseMessage = await response.text();
      Swal.fire({ icon: "error", text: responseMessage });
      return;
    } catch (FetchError) {
      await Swal.fire({
        icon: "error",
        text: "Something went wrong, failed to connect to server!",
      });
      setIsLoggedIn("serverError");
      return;
    }
  }

  async function deleteLikePost(postID) {
    try {
      const response = await fetch("http://localhost:5050/posts/like", {
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
          text: "Please login to be able to unlike a users post!",
        });
        localStorage.removeItem("loggedInUser");
        setIsLoggedIn(false);
        return;
      }
      if (response.status === 200) {
        if (username) {
          const { feedList } = await getAllFeeds(username);
          setFeeds(feedList);

          return;
        }
        const { loggedIn, feedList } = await getFeeds();
        await setIsLoggedIn(loggedIn);
        if (loggedIn) {
          setFeeds(feedList);
        }
        return;
      }
      const responseMessage = await response.text();
      Swal.fire({ icon: "error", text: responseMessage });
      return;
    } catch (FetchError) {
      await Swal.fire({
        icon: "error",
        text: "Something went wrong, failed to connect to server!",
      });
      setIsLoggedIn("serverError");
      return;
    }
  }

  return (
    <div className="postLikes">
      <details className="postLikes_details">
        <summary className="postLikes_amount">{post.likes.length}</summary>
        {post.likes.length === 0 ? null : (
          <ul className={`likeList`}>
            {post.likes.map(function (user, index) {
              return (
                <li
                  key={index}
                  className="likeList_name"
                  onClick={function (event) {
                    redirect(user);
                  }}
                >
                  {user}
                </li>
              );
            })}
          </ul>
        )}
      </details>

      {post.likes.includes(loggedInUser) ? (
        <ButtonIcon
          icon={<IoMdHeartDislike />}
          className={"like"}
          handleClick={function (event) {
            deleteLikePost(post._id);
          }}
        />
      ) : (
        <ButtonIcon
          icon={<IoMdHeart />}
          className={"like"}
          handleClick={function (event) {
            likePost(post._id);
          }}
        />
      )}
    </div>
  );
}
