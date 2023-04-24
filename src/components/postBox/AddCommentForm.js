import { useState } from "react";

export default function AddCommentForm({ postID, index }) {
  const [words, setWords] = useState(0);

  async function addComment() {}

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
        placeholder="Add comment..."
        onChange={function (event) {
          setWords(event.target.textLength);
        }}
      />
      <button className="addCommentForm_button">Add comment</button>
    </form>
  );
}
