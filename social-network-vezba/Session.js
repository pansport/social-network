class Session {
  user_id = "";

  startSession() {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = "user_id =" + this.user_id + ";" + expires;
  }

  getSession() {
    let name = "user_id";
    let ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  destroySession() {
    let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let equalPos = cookie.indexOf("=");
      let name = equalPos > -1 ? cookie.substring(0, equalPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
}
