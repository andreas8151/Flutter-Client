import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import Swal from "sweetalert2";
import { getFeeds } from "../functions/getFeeds";
import "../sass/PostBox.scss";
import { getAllFeeds } from "../functions/getAllFeeds";

export default function PostBox({ post, setFeeds, showButtons }) {
  const navigate = useNavigate();
  const creation = new Date(post.creation);
  const { setIsLoggedIn } = useContext(AuthenticationContext);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [postContent, setPostContent] = useState(post.content);

  useEffect(function () {
    setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")).username);
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
          text: "Please login to be able to follow users!",
        });
        localStorage.removeItem("loggedInUser");
        setIsLoggedIn(false);
        return;
      }
      if (response.status === 200) {
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
          text: "Please login to be able to follow users!",
        });
        localStorage.removeItem("loggedInUser");
        setIsLoggedIn(false);
        return;
      }
      if (response.status === 200) {
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

  async function addComment(event, postID) {
    event.preventDefault();

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
          text: "Please login to be able to follow users!",
        });
        localStorage.removeItem("loggedInUser");
        setIsLoggedIn(false);
        return;
      }
      if (response.status === 200) {
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

  function redirect(username) {
    navigate(`/users/${username}`);
  }

  return (
    <div className="postBox">
      <h3
        className="postBox_username"
        onClick={function (event) {
          redirect(post.username);
        }}
      >
        {post.username}
      </h3>
      <p className="postBox_description">{post.postText}</p>
      <div className="postBox_details">
        <span className="postBox_details_date">
          {creation.toLocaleString()}
        </span>
        <div className="postBox_details_likes">
          {showButtons && (
            <div className="postBox_buttons">
              <textarea
                className="postBox_text_input"
                onChange={(e) => setPostContent(e.target.value)}
                value={postContent}
              ></textarea>
              <button
                className="postBox_edit_button"
                onClick={(event) => updatePost(event, post._id)}
              >
                Edit
              </button>

              <button
                onClick={() => deletePost(post._id)}
                className="postBox_delete_button"
              >
                Delete
              </button>
            </div>
          )}
          <p className="postBox_details_likes_amount">{post.likes.length}</p>
          {post.likes.length === 0 ? null : (
            <ul className="postBox_details_likes_list">
              {post.likes.map(function (user, index) {
                return (
                  <li
                    key={index}
                    className="postBox_details_likes_list_name"
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

          {post.likes.includes(loggedInUser) ? (
            <button
              className="postBox_details_likes_button unlike"
              onClick={function (event) {
                deleteLikePost(post._id);
              }}
            >
              remove like
            </button>
          ) : (
            <button
              className="postBox_details_likes_button like"
              onClick={function (event) {
                likePost(post._id);
              }}
            >
              Like post
            </button>
          )}
        </div>
      </div>

      <form
        className="postBox_commentForm"
        onSubmit={function (event) {
          addComment(event, post._id);
        }}
      >
        <label className="postBox_commentForm_label">Comment</label>
        <textarea
          className="postBox_commentForm_textarea"
          maxLength={200}
          placeholder="Add comment..."
        />
        <button className="postBox_commentForm_button">Add comment</button>
      </form>

      {post.comments.length === 0 ? null : (
        <div className="postBox_commentList">
          <details className="postBox_commentList_details">
            <summary className="postBox_commentList_summary">
              Show {post.comments.length} comments
            </summary>
            <ul className="postBox_commentList_list">
              {post.comments.map(function (comment, index) {
                return (
                  <li key={index} className="postBox_commentList_list_item">
                    <h5
                      className="postBox_commentList_list_item_user"
                      onClick={function (event) {
                        redirect(comment.username);
                      }}
                    >
                      {comment.username}
                    </h5>
                    <p className="postBox_commentList_list_item_comment">
                      {comment.comment}
                    </p>
                  </li>
                );
              })}
            </ul>
          </details>
        </div>
      )}
    </div>
  );
}
