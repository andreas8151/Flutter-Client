import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useContext } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import Swal from "sweetalert2";
import ButtonIcon from "../buttons/ButtonIcon";
export default function MenuList({ menuList, searchBox, hideMenu }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  async function logout() {
    const confirmLogout = await Swal.fire({
      title: "Logga ut?",
      text: `Are you sure you want to logout?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
      reverseButtons: true,
    });
    if (confirmLogout.isConfirmed) {
      try {
        const response = await fetch(
          "http://localhost:5050/authentication/logout",
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("loggedInUser");
          setIsLoggedIn(false);
          return;
        }

        if (response.status === 400) {
          const responseMessage = await response.text();
          await Swal.fire({
            icon: "error",
            text: responseMessage,
          });
          return;
        }

        if (response.status === 200) {
          const responseMessage = await response.text();
          await Swal.fire({
            icon: "success",
            text: responseMessage,
          });
          localStorage.removeItem("loggedInUser");
          navigate("/login");
          setIsLoggedIn(false);
          return;
        }
      } catch (FetchError) {
        Swal.fire({
          icon: "error",
          text: "Something went wrong, failed to connect to server!",
        });
        setIsLoggedIn("serverError");
        return;
      }
    } else {
      await Swal.fire(
        "Cancelled",
        `Logout cancelled, nice to have you here at TravelFlow 🥳!`,
        "error"
      );
      return;
    }
  }

  return (
    <ul
      className={`menuList ${menuList} ${
        menuList === "visible" && searchBox ? "searchBox" : ""
      }`}
    >
      {!isLoggedIn ? (
        <Link className="menuList_item_link" to={"/login"} onClick={hideMenu}>
          <h2>Login</h2>
        </Link>
      ) : (
        <Link className="menuList_item_link" to={"/feed"} onClick={hideMenu}>
          <h2>Feeds</h2>
        </Link>
      )}

      <li className="menuList_item">
        <Link className="menuList_item_link" to={"/users"} onClick={hideMenu}>
          <h2>Users</h2>
        </Link>
      </li>

      {!isLoggedIn ? null : (
        <li className="menuList_item icons">
          <ButtonIcon
            onClick={hideMenu}
            handleClick={logout}
            icon={<MdLogout />}
          />
        </li>
      )}
    </ul>
  );
}
