export async function getFeeds() {
  try {
    const response = await fetch("https://flutter-server.onrender.com/posts/following", {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 401) {
      localStorage.removeItem("loggedInUser");
      return { loggedIn: false };
    }

    if (response.status === 404) {
      return { loggedIn: true, feedList: [] };
    }

    if (response.status === 200) {
      const responseMessage = await response.json();
      return { loggedIn: true, feedList: responseMessage.posts };
    }
  } catch (FetchError) {
    localStorage.removeItem("loggedInUser");
    return { loggedIn: "serverError" };
  }
}
