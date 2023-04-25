import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonIcon from "../buttons/ButtonIcon";
import { MdEdit, MdCancel } from "react-icons/md";
import EditPostForm from "./EditPostForm";

export default function PostUpdate({ setFeeds, post }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { username } = useParams();

  const [showEdit, setShowEdit] = useState(false);

  useEffect(function () {
    if (localStorage.getItem("loggedInUser")) {
      setLoggedInUser(
        JSON.parse(localStorage.getItem("loggedInUser")).username
      );
    }
  }, []);

  return (
    <div className="postBox_description">
      {username !== loggedInUser ? null : (
        <div className="postBox_description_postEdit">
          {showEdit ? (
            <ButtonIcon
              className={"editPost cross"}
              handleClick={(event) => setShowEdit(false)}
              icon={<MdCancel />}
            />
          ) : (
            <ButtonIcon
              className={"editPost"}
              handleClick={(event) => setShowEdit(true)}
              icon={<MdEdit />}
            />
          )}
        </div>
      )}
      {showEdit ? (
        <EditPostForm
          post={post}
          username={username}
          setFeeds={setFeeds}
          setShowEdit={setShowEdit}
        />
      ) : (
        <p className="postBox_description_text">{post.postText}</p>
      )}
    </div>
  );
}
