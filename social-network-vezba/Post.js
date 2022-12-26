class Post {
  post_id = "";
  post_content = "";
  user_id = "";
  likes = "";
  apiURL = "https://63a1f70cba35b96522ed2526.mockapi.io";

  async create() {
    let session = new Session();
    let session_id = session.getSession();
    session_id = session_id.slice(1);

    let data = {
      user_id: session_id,
      content: this.post_content,
      likes: 0,
    };

    data = JSON.stringify(data);

    let response = await fetch(this.apiURL + "/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    let data_res = await response.json();
    return data_res;
  }
}
