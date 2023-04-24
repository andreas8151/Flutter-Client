import { useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import MenuIcons from "./MenuIcons";
import MenuList from "./MenuList";

//Style
import "../../sass/navbar/Navbar.scss";

export default function Navbar({ children }) {
  const [menuList, setMenuList] = useState("");
  const [menu, setMenu] = useState(true);
  const [cross, setCross] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();
  const { isLoggedIn } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(function () {
    async function getUsername() {
      if (isLoggedIn) {
        const username = await JSON.parse(localStorage.getItem("loggedInUser"))
          .username;

        setLoggedInUser(username);
      }
    }
    getUsername();
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

  return (
    <header className="fixedHeader">
      <div className="relativeHeader">
        <div className="navIcons">
          <nav className="navIcons_menu">
            <MenuIcons toggleMenu={toggleMenu} menu={menu} cross={cross} />

            <MenuList menuList={menuList} hideMenu={hideMenu} />
          </nav>
        </div>
        <h1
          className="companyLogo"
          onClick={function () {
            redirect("login");
          }}
        >
          TravelFlow
        </h1>
        {!isLoggedIn ? null : (
          <div className="userSettingsIcon">
            <CgProfile
              className="userSettingsIcon_icon"
              onClick={function () {
                redirect(`user/${loggedInUser}`);
              }}
            />
          </div>
        )}
      </div>
    </header>
  );
}
