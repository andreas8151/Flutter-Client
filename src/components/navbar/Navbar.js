import { useContext, useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import "../../sass/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../contexts/Authentication";

export default function Navbar() {
  const [menuList, setMenuList] = useState("");
  const [menu, setMenu] = useState(true);
  const [cross, setCross] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();
  const { setIsLoggedIn } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(function () {
    if (!localStorage.getItem("LoggedInUser")) {
      setIsLoggedIn(false);
    } else {
      const getUsername = localStorage.getItem("LoggedInUser");
      setLoggedInUser(JSON.parse(getUsername).username);
    }
  }, []);

  function toggleMenu() {
    if (menu) {
      setMenu(false);
      setCross(true);
      setMenuList("visible");
    } else {
      hideMenu();
    }
  }

  function hideMenu() {
    setCross(false);
    setMenu(true);
    setMenuList("");
  }

  function redirect(endpoint) {
    navigate(`/${endpoint}`);
  }

  if (!loggedInUser) {
    <section className="mainSection">
      <h2>Loading...</h2>
    </section>;
  }

  return (
    <header className="NavBar">
      <nav className="menu">
        <IoMenu
          onClick={toggleMenu}
          className={`menuIcon ${menu ? "visible" : ""}`}
        />
        <IoClose
          onClick={toggleMenu}
          className={`menuIcon ${cross ? "visible" : ""}`}
        />

        <ul className={`menuList ${menuList}`}>
          <li className="menuListItem" onClick={hideMenu}>
            <Link to="/feed">Feed</Link>
          </li>
          <li className="menuListItem" onClick={hideMenu}>
            <Link to="/user">Users</Link>
          </li>
        </ul>
      </nav>
      <h1
        className="companyLogo"
        onClick={function () {
          redirect("login");
        }}
      >
        TravelFlow
      </h1>

      <div className="userSettingsIcon">
        <CgProfile
          className="userSettingsIcon_icon"
          onClick={function () {
            redirect(`user/${loggedInUser}`);
          }}
        />
      </div>
    </header>
  );
}
