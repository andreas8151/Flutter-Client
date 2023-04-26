import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/forms/UserForm";
import "../sass/Login.scss";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import Swal from "sweetalert2";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    const user = { username, password };

    try {
      const response = await fetch(
        "https://flutter-server.onrender.com/authentication/login",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(user),
        }
      );

      if (response.status === 400) {
        const responseMessage = await response.text();
        Swal.fire({
          icon: "error",
          text: responseMessage,
        });
        return;
      }

      if (response.status === 404) {
        const responseMessage = await response.text();
        Swal.fire({
          icon: "error",
          text: responseMessage,
        });
        return;
      }

      if (response.status === 200) {
        const serverObject = await response.json();
        localStorage.setItem("loggedInUser", JSON.stringify(serverObject));

        setIsLoggedIn(true);
        setUsername("");
        setPassword("");
        navigate("/feed");
        return;
      }
    } catch (FetchError) {
      await Swal.fire({
        icon: "error",
        text: "Something went wrong, failed to connect to server!",
      });
      setIsLoggedIn("serverError");
      return;
    }
  }

  return (
    <section className="mainSection" id="homepage">
      <UserForm
        heading={"Login"}
        handleSubmit={login}
        username={username}
        setUsername={setUsername}
        password1={password}
        setPassword1={setPassword}
        autoCompletePassword={"current-password"}
        buttonValue={"Login"}
      />
    </section>
  );
}
