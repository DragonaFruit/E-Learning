document
  .querySelector(".toggle-password")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const icon = this;

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });

const inputs = document.querySelectorAll(".kotak input");
inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      input.parentElement.classList.remove("focused");
    }
  });
});

const form = document.querySelector("form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const errorDiv = document.getElementById("error");

if (form) form.setAttribute("novalidate", "true");

function checkInputs() {
  const filled = usernameInput.value.trim().length > 0 && passwordInput.value.trim().length > 0;
  if (filled) {
    loginBtn.classList.remove("btn--disabled");
    errorDiv.style.display = "none";
    errorDiv.textContent = "";
  } else {
    loginBtn.classList.add("btn--disabled");
  }
}

if (usernameInput && passwordInput) {
  usernameInput.addEventListener("input", checkInputs);
  passwordInput.addEventListener("input", checkInputs);
  window.addEventListener("load", checkInputs);
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userEmpty = !usernameInput.value.trim();
    const passEmpty = !passwordInput.value.trim();

    if (userEmpty || passEmpty) {
      errorDiv.style.display = "block";
      if (userEmpty && passEmpty) {
        errorDiv.textContent = "Harap isi username dan password.";
        usernameInput.focus();
      } else if (userEmpty) {
        errorDiv.textContent = "Harap isi username.";
        usernameInput.focus();
      } else {
        errorDiv.textContent = "Harap isi password.";
        passwordInput.focus();
      }
      return;
    }

     window.location.href = "/Home/index.html";

  });
}