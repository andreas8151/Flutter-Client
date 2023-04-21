import React, { useState } from "react";

export default function Profile() {
  const [postText, setPostText] = useState("");

  /*  function handlePostText(event) {
    event.preventDefault();
    setPostText(event.target.value);
  } */

  async function postFetch() {
    try {
      const result = await fetch("http://localhost:5050/posts/add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ postText }),
        credentials: "include",
      });
      const data = await result.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={postFetch}>
        <label>Post</label>
        <textarea
          onChange={(event) => setPostText(event.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
