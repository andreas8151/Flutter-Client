export async function getAllFeeds(username) {
  try {
    const response = await fetch(`https://flutter-server.onrender.com/posts/${username}`, {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 400) {
      return { feedList: [] };
    }

    if (response.status === 404) {
      return { feedList: "noPosts" };
    }

    if (response.status === 200) {
      const responseMessage = await response.json();
      return { feedList: responseMessage };
    }
  } catch (FetchError) {
    return { feedList: "serverError" };
  }
}
