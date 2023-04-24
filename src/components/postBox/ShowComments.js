import { IoIosArrowForward } from "react-icons/io";

export default function ShowComments({ comments, redirect }) {
  return (
    <div className="commentsList">
      <details className="commentsList_details">
        <summary className="commentsList_summary">
          <h4>
            Show {comments.length}{" "}
            {comments.length === 1 ? "comment" : "comments"}
          </h4>
          <IoIosArrowForward className="summaryArrow" />
        </summary>
        <ul className="commentsList_list">
          {comments.map(function (comment, index) {
            return (
              <li key={index} className="commentsList_list_item">
                <h5
                  className="commentsList_list_item_user"
                  onClick={function (event) {
                    redirect(comment.username);
                  }}
                >
                  {comment.username}
                </h5>
                <p className="commentsList_list_item_comment">
                  {comment.comment}
                </p>
              </li>
            );
          })}
        </ul>
      </details>
    </div>
  );
}
