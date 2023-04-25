import { useContext, useState } from "react";
import { getAllFeeds } from "../../functions/getAllFeeds";
import Swal from "sweetalert2";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";

export default function EditPostForm({
  post,
  username,
  setFeeds,
  setShowEdit,
}) {
  const { setIsLoggedIn } = useContext(AuthenticationContext);
  const [postContent, setPostContent] = useState(post.postText);

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
    <form className="postBox_description_form">
      <textarea
        className="postBox_description_form_textarea"
        onChange={(e) => setPostContent(e.target.value)}
        value={postContent}
        required
      ></textarea>
      <button
        className="postBox_description_form_button"
        onClick={(event) => updatePost(event, post._id)}
      >
        Edit Post
      </button>
    </form>
  );
}
