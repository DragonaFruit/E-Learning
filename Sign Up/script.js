document.addEventListener("DOMContentLoaded", () => {
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const registerBtn = document.getElementById("registerBtn");
  const toggle = document.getElementById("togglePassword");
  const form = document.querySelector("form");

  function getOrCreateHelp(el, id) {
    let help = el.parentNode.querySelector(`#${id}`);
    if (!help) {
      help = document.createElement("div");
      help.id = id;
      help.style.color = "#ff6b6b";
      help.style.fontSize = "13px";
      help.style.marginTop = "6px";
      help.setAttribute("aria-live", "polite");
      el.parentNode.appendChild(help);
    }
    return help;
  }

  const userHelp = getOrCreateHelp(username, "userHelp");
  const emailHelp = getOrCreateHelp(email, "emailHelp");
  const pwHelp = getOrCreateHelp(password, "pwHelp");

  function clearErrors() {
    userHelp.textContent = "";
    emailHelp.textContent = "";
    pwHelp.textContent = "";
    [username, email, password].forEach((i) =>
      i.removeAttribute("aria-invalid")
    );
  }

  function updateRegisterState() {
    const pwLen = password.value.trim().length;
    const filled =
      username.value.trim() !== "" && email.value.trim() !== "" && pwLen >= 8;

    if (password.value.trim().length > 0 && pwLen < 8) {
      pwHelp.textContent = "Password harus minimal 8 karakter";
    } else {
      pwHelp.textContent = "";
    }

    registerBtn.disabled = !filled;
  }

  [username, email, password].forEach((el) =>
    el.addEventListener("input", () => {
      const map = { username: userHelp, email: emailHelp, password: pwHelp };
      const id = el.id;
      map[id].textContent = "";
      el.removeAttribute("aria-invalid");
      updateRegisterState();
    })
  );

  updateRegisterState();

  if (toggle) {
    toggle.addEventListener("click", () => {
      const isPassword = password.type === "password";
      password.type = isPassword ? "text" : "password";
      toggle.classList.toggle("fa-eye", !isPassword);
      toggle.classList.toggle("fa-eye-slash", isPassword);
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();

      let firstInvalid = null;

      if (username.value.trim() === "") {
        userHelp.textContent = "Mohon isi username";
        username.setAttribute("aria-invalid", "true");
        firstInvalid = firstInvalid || username;
      }

      if (email.value.trim() === "") {
        emailHelp.textContent = "Mohon isi G-mail";
        email.setAttribute("aria-invalid", "true");
        firstInvalid = firstInvalid || email;
      } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
          emailHelp.textContent = "Alamat email tidak valid";
          email.setAttribute("aria-invalid", "true");
          firstInvalid = firstInvalid || email;
        }
      }

      if (password.value.trim() === "") {
        pwHelp.textContent = "Mohon isi password";
        password.setAttribute("aria-invalid", "true");
        firstInvalid = firstInvalid || password;
      } else if (password.value.trim().length < 8) {
        pwHelp.textContent = "Password harus minimal 8 karakter";
        password.setAttribute("aria-invalid", "true");
        firstInvalid = firstInvalid || password;
      }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      // semua valid -> redirect ke Sign In
      // gunakan origin + encoded path agar server menerima permintaan
      const signInPath = "/Sign%20In/index.html"; // ubah kalau lokasi beda
      const target = window.location.origin + signInPath;
      console.log("Redirecting to", target);
      window.location.href = target;
    });
  }
});
