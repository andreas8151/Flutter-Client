import "../sass/PostBox.scss";

export default function PostBox({ post, getFeeds }) {
  const creation = new Date(post.creation);

  async function likePost(postID) {}

  async function addComment(event, postID) {
    event.preventDefault();
  }

  return (
    <div className="postBox">
      <h3 className="postBox_username">{post.username}</h3>
      <p className="postBox_description">{post.postText}</p>
      <div className="postBox_details">
        <span className="postBox_details_date">
          {creation.toLocaleString()}
        </span>
        <div className="postBox_details_likes">
          <p className="postBox_details_likes_amount">{post.likes.length}</p>
          <button
            className="postBox_details_likes_button"
            onClick={function (event) {
              likePost(post._id);
            }}
          >
            Like post
          </button>
        </div>
      </div>

      <form
        className="postBox_comment"
        onSubmit={function (event) {
          addComment(event, post._id);
        }}
      >
        <label className="postBox_comment_label">Comment</label>
        <textarea
          className="postBox_comment_textarea"
          placeholder="Add comment..."
        />
        <button className="postBox_comment_button">Add comment</button>
      </form>
    </div>
  );
}
