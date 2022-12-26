let session = new Session();
let session_id = session.getSession();

if (session_id !== "") {
  let user = new User();
  let data = user.get(session_id);

  async function populateUserData() {
    let user = new User();
    let data = await user.get(session_id);

    document.querySelector("#username").innerText = data.username;
    document.querySelector("#email").innerText = data.email;

    document.querySelector("#korisnicko_ime").value = data.username;
    document.querySelector("#edit_email").value = data.email;
  }
  populateUserData();
} else {
  window.location.href = "/";
}

document.querySelector("#logout").addEventListener("click", (event) => {
  event.preventDefault();
  session.destroySession();
  window.location.href = "/";
});

document.querySelector("#editAccount").addEventListener("click", () => {
  document.querySelector(".custom-modal").style.display = "block";
});

document.querySelector("#closeModal").addEventListener("click", () => {
  document.querySelector(".custom-modal").style.display = "none";
});

document.querySelector("#editForm").addEventListener("submit", (event) => {
  event.preventDefault();

  let user = new User();
  user.username = document.querySelector("#korisnicko_ime").value;
  user.email = document.querySelector("#edit_email").value;
  user.edit();
});

document.querySelector("#deleteProfile").addEventListener("click", () => {
  let text = "Da li ste sigruni da zelite da obrisete profil?";

  if (confirm(text) === true) {
    let user = new User();
    user.delete();
  }
});

document.querySelector("#postForm").addEventListener("submit", (event) => {
  event.preventDefault();

  async function createPost() {
    let content = document.getElementById("postContent").value;
    document.getElementById("postContent").value = "";

    let post = new Post();

    post.post_content = content;
    post = await post.create();

    let current_user = new User();
    current_user = await current_user.get(session_id);

    document.querySelector(".allPostsWrapper").innerHTML = `
    <div class='single-post' data-post_id='${post.post_id}'>
      <div class='post-content'>${post.post_content}</div>
    
      <div class='post-comments'>
        <form>
        <input type='text' placeholder='Napisi komentar...' />
        <button onclick='commentPostSubmit(event)'>Comment</button>
        </form>
      </div>
    </div>
    `;
  }

  createPost();
});

const commentPostSubmit = (event) => {
  event.preventDefault();
};
