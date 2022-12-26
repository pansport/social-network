class User {
  user_id = "";
  username = "";
  email = "";
  password = "";
  apiURL = "https://63a1f70cba35b96522ed2526.mockapi.io";

  create() {
    let data = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    data = JSON.stringify(data);

    fetch(this.apiURL + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        let session = new Session();
        session.user_id = data.id;
        session.startSession();

        window.location.href = "index2.html";
      });
  }

  async get(user_id) {
    let apiURL = this.apiURL + "/users/" + user_id.slice(1);

    let response = await fetch(apiURL);
    let data = await response.json();
    return data;
  }

  edit() {
    let data = {
      username: this.username,
      email: this.email,
    };

    data = JSON.stringify(data);

    let session = new Session();
    let session_id = session.getSession();

    fetch(this.apiURL + "/users/" + session_id.slice(1), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = "index2.html";
      });
  }

  login() {
    fetch(this.apiURL + "/users")
      .then((response) => response.json())
      .then((data) => {
        let login_successful = 0;
        data.forEach((user) => {
          if (user.email === this.email && user.password === this.password) {
            let session = new Session();
            session.user_id = user.id;
            session.startSession();

            login_successful = 1;

            document.location.href = "index2.html";
          } else {
            console.log("nisi ulogovan");
          }
        });

        if (login_successful === 0) {
          alert("Netacan email ili sifra");
          document.querySelector("#login-email").value = "";
          document.querySelector("#login-password").value = "";
        }
      });
  }

  delete() {
    let session = new Session();
    let session_id = session.getSession();

    fetch(this.apiURL + "/users/" + session_id.slice(1), {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        let session = new Session();
        session.destroySession();
        window.location.href = "/";
      });
  }
}
