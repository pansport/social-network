document.getElementById("registracija").addEventListener("click", () => {
  document.querySelector(".custom-modal").style.display = "block";
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.querySelector(".custom-modal").style.display = "none";
});

let config = {
  korisnicko_ime: {
    required: true,
    minLength: 5,
    maxLength: 50,
  },

  register_email: {
    required: true,
    email: true,
    minLength: 5,
    maxLength: 50,
  },

  register_lozinka: {
    required: true,
    minLength: 7,
    maxLength: 25,
    matching: "ponovi_lozinku",
  },

  ponovi_lozinku: {
    required: true,
    minLength: 7,
    maxLength: 25,
    matching: "register_lozinka",
  },
};

let validator = new Validator(config, "#registrationForm");

document
  .querySelector("#registrationForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    if (validator.validationPassed()) {
      let user = new User();
      user.username = document.querySelector("#korisnicko_ime").value;
      user.email = document.querySelector("#email").value;
      user.password = document.querySelector("#lozinka").value;
      user.create();
    } else {
      alert("nije ok");
    }
  });
