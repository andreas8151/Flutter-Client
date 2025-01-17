export async function getUsers() {
  try {
    const response = await fetch(
      "https://flutter-server.onrender.com/users/allUsers",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }
    );

    if (response.status === 404) {
      return [];
    }

    if (response.status === 200) {
      const serverObject = await response.json();
      return serverObject.users;
    }
  } catch (error) {
    localStorage.removeItem("loggedInUser");
    return "serverError";
  }
}
