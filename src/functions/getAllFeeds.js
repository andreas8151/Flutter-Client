export async function getAllFeeds(username) {
  try {
    const response = await fetch(`http://localhost:5050/posts/${username}`, {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 400) {
      return { feedList: [] };
    }

    if (response.status === 404) {
      const responseMessage = await response.text();
      return { feedList: responseMessage };
    }

    if (response.status === 200) {
      const responseMessage = await response.json();
      return { feedList: responseMessage };
    }
  } catch (FetchError) {
    return { feedList: "serverError" };
  }
}
