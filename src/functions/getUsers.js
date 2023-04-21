export async function getUsers() {
  try {
    const response = await fetch("http://localhost:5050/users/allUsers", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 404) {
      return [];
    }

    if (response.status === 200) {
      const serverObject = await response.json();
      return serverObject.users;
    }
  } catch (error) {
    return "serverError";
  }
}
