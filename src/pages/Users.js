import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../contexts/UsersContext";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import "../sass/Users.scss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const { users } = useContext(UsersContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthenticationContext);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(
    function () {
      async function getUserFollowing() {
        if (isLoggedIn) {
          const username = await JSON.parse(
            localStorage.getItem("loggedInUser")
          ).username;

          const followingList = await users.filter(function (user) {
            return user.username === username;
          });
          setLoggedInUser(followingList[0]);

          return;
        }
        setLoggedInUser(false);
      }
      getUserFollowing();
    },
    [isLoggedIn, users, setIsLoggedIn]
  );

  async function followUser(user) {
    try {
      const response = await fetch("http://localhost:5050/following/follow", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username: user }),
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
        return;
      }
      const responseMessage = await response.text();
      Swal.fire({ icon: "error", text: responseMessage });
      return;
    } catch (FetchError) {
      Swal.fire({
        icon: "error",
        text: "Something went wrong, failed to connect to server!",
      });
      return;
    }
  }

  async function unFollowUser(user) {
    try {
      const response = await fetch("http://localhost:5050/following/unFollow", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username: user }),
      });

      if (response.status === 401) {
        await Swal.fire({
          icon: "error",
          text: "Please login to be able to unfollow users!",
        });
        localStorage.removeItem("loggedInUser");
        setIsLoggedIn(false);
        return;
      }
      if (response.status === 200) {
        return;
      }
      const responseMessage = await response.text();
      Swal.fire({ icon: "error", text: responseMessage });
      return;
    } catch (FetchError) {
      Swal.fire({
        icon: "error",
        text: "Something went wrong, failed to connect to server!",
      });
      return;
    }
  }

  function redirect(username) {
    navigate(`/users/${username}`);
  }

  if (loggedInUser === null) {
    return (
      <section className="mainSection">
        <h3>Loading...</h3>
      </section>
    );
  }

  return (
    <section className="mainSection">
      <div className="usersList">
        {users.map(function (user, index) {
          return (
            <div key={index} className="usersList_user">
              <h3
                className="usersList_user_name"
                onClick={function (event) {
                  redirect(user.username);
                }}
              >
                {user.username}
              </h3>
              {!isLoggedIn ? null : user.username ===
                loggedInUser.username ? null : loggedInUser.following.includes(
                  user.username
                ) ? (
                <button
                  className="usersList_user_button"
                  onClick={function (event) {
                    unFollowUser(user.username);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="usersList_user_button"
                  onClick={function (event) {
                    followUser(user.username);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
