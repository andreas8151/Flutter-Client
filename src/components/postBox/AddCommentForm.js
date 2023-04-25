import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { getFeeds } from "../../functions/getFeeds";
import { getAllFeeds } from "../../functions/getAllFeeds";
import { useParams } from "react-router-dom";

export default function AddCommentForm({ postID, setFeeds }) {
  const { setIsLoggedIn } = useContext(AuthenticationContext);
  const [words, setWords] = useState(0);
  const [text, setText] = useState("");
  const { username } = useParams();

  async function addComment(event) {
    event.preventDefault();

    const commentText = text.trim();
    try {
      const response = await fetch("http://localhost:5050/posts/comment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ postID, commentText }),
      });

      if (response.status === 401) {
        await Swal.fire({
          icon: "error",
          text: "Please login to be able to comment a users post!",
        });
        localStorage.removeItem("loggedInUser");
        setIsLoggedIn(false);
        return;
      }

      if (response.status === 200) {
        if (username) {
          const { feedList } = await getAllFeeds(username);
          setText("");
          setWords(0);
          setFeeds(feedList);
          return;
        }
        const { loggedIn, feedList } = await getFeeds();
        await setIsLoggedIn(loggedIn);
        setText("");
        setWords(0);
        if (loggedIn) {
          setFeeds(feedList);
        }
        return;
      }
      const responseMessage = await response.text();
      const responseJSON = await response.json();
      if (responseMessage) {
        await Swal.fire({ icon: "error", text: responseMessage });
      }
      if (responseJSON) {
        await Swal.fire({ icon: "error", text: responseJSON });
      }
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
    <form className="addCommentForm" onSubmit={addComment}>
      <div className="addCommentForm_headingLine">
        <label
          htmlFor={`comment${postID}`}
          className="addCommentForm_headingLine_label"
        >
          Add comment
        </label>
        <span className="addCommentForm_headingLine_words">{words} / 200</span>
      </div>

      <textarea
        className="addCommentForm_textarea"
        id={`comment${postID}`}
        maxLength={200}
        rows={3}
        value={text}
        placeholder="Add comment..."
        onChange={function (event) {
          setWords(event.target.textLength);
          setText(event.target.value);
        }}
        required
      />
      <button className="addCommentForm_button">Add comment</button>
    </form>
  );
}
