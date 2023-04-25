import { useNavigate, useParams } from "react-router-dom";
import "../../sass/postBox/PostBox.scss";
import AddCommentForm from "./AddCommentForm";
import ShowComments from "./ShowComments";
import PostLikes from "./PostLikes";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import Swal from "sweetalert2";
import { getAllFeeds } from "../../functions/getAllFeeds";
import ButtonIcon from "../buttons/ButtonIcon";
import { MdDeleteOutline, MdEdit, MdCancel } from "react-icons/md";
import Button from "../buttons/Button";

export default function PostBox({ post, setFeeds }) {
  const { username } = useParams();

  const [loggedInUser, setLoggedInUser] = useState(null);

  const navigate = useNavigate();
  const creation = new Date(post.creation).toLocaleDateString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const { setIsLoggedIn } = useContext(AuthenticationContext);
  const [postContent, setPostContent] = useState(post.postText);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(function () {
    if (localStorage.getItem("loggedInUser")) {
      setLoggedInUser(
        JSON.parse(localStorage.getItem("loggedInUser")).username
      );
    }
  }, []);

  function redirect(username) {
    navigate(`/users/${username}`);
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
    <div className="postBox">
      <h3
        className="postBox_username"
        onClick={function (event) {
          redirect(post.username);
        }}
      >
        <div className="postBox_username_title">{post.username}</div>

        {username !== loggedInUser ? null : (
          <ButtonIcon
            handleClick={() => deletePost(post._id)}
            icon={<MdDeleteOutline />}
          />
        )}
      </h3>
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

      <div className="postBox_details">
        <span className="postBox_details_date">{creation}</span>
        <PostLikes post={post} setFeeds={setFeeds} redirect={redirect} />
      </div>
      {post.comments.length === 0 ? (
        <h5>Be the first to comment!</h5>
      ) : (
        <ShowComments comments={post.comments} redirect={redirect} />
      )}
      <AddCommentForm postID={post._id} setFeeds={setFeeds} />
    </div>
  );
}
