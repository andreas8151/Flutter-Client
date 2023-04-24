import { useNavigate } from "react-router-dom";
import "../../sass/postBox/PostBox.scss";
import AddCommentForm from "./AddCommentForm";
import ShowComments from "./ShowComments";
import PostLikes from "./PostLikes";

export default function PostBox({ post, setFeeds, index }) {
  const navigate = useNavigate();
  const creation = new Date(post.creation).toLocaleDateString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

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
        <span className="postBox_details_date">{creation}</span>
        <PostLikes post={post} setFeeds={setFeeds} redirect={redirect} />
      </div>
      {post.comments.length === 0 ? (
        <h5>Be the first to comment!</h5>
      ) : (
        <ShowComments comments={post.comments} redirect={redirect} />
      )}
      <AddCommentForm postID={post._id} index={index} />
    </div>
  );
}
