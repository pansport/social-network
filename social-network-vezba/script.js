let session = new Session();
session = session.getSession();

if (session !== "") {
  window.location.href = "index2.html";
}

document.querySelector("#registerBtn").addEventListener("click", () => {
  document.querySelector(".custom-modal").style.display = "block";
});

document.querySelector("#closeModal").addEventListener("click", () => {
  document.querySelector(".custom-modal").style.display = "none";
});

document
  .getElementById("registrationForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    let user = new User();
    user.username = document.querySelector("#korisnicko_ime").value;
    user.email = document.querySelector("#email").value;
    user.password = document.querySelector("#lozinka").value;

    user.create();
  });

document.querySelector(".login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  let email = document.querySelector("#login-email").value;
  let password = document.querySelector("#login-password").value;

  let user = new User();
  user.email = email;
  user.password = password;

  user.login();
});
