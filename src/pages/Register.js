import { useContext, useState } from "react";
import UserForm from "../components/UserForm";
import Swal from "sweetalert2";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { setIsLoggedIn } = useContext(AuthenticationContext);

  async function register(event) {
    event.preventDefault();
    let response = null;

    if (password1 !== password2) {
      Swal.fire({
        icon: "error",
        text: "Passwords does not match, please change to register an account!",
      });
      return;
    }

    const user = { username: username, password: password1 };

    try {
      response = await fetch("http://localhost:5050/authentication/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });

      const responseMessage = await response.text();

      if (response.status === 400) {
        Swal.fire({
          icon: "error",
          text: responseMessage,
        });
        return;
      }

      if (response.status === 409) {
        Swal.fire({
          icon: "error",
          text: responseMessage,
        });
        return;
      }

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          text: responseMessage,
        });
        setUsername("");
        setPassword1("");
        setPassword2("");
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
        heading={"Register"}
        handleSubmit={register}
        username={username}
        setUsername={setUsername}
        password1={password1}
        setPassword1={setPassword1}
        password2={password2}
        setPassword2={setPassword2}
        passwordAuthentication={true}
        autoCompletePassword={"new-password"}
        buttonValue={"Register"}
      />
    </section>
  );
}
