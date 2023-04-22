export async function getFeeds() {
  try {
    const response = await fetch("http://localhost:5050/posts/following", {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 401) {
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
    return { loggedIn: "serverError" };
  }
}
