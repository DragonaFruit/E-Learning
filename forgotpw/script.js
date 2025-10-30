document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("username");
  const btn =
    document.querySelector(".tengah .btn") ||
    document.querySelector("button.btn");

  if (!emailInput) return;

  
  if (btn && btn.hasAttribute && btn.hasAttribute("onclick")) {
    btn.removeAttribute("onclick");
  }

  
  const ERROR_ID = "forgotpw-email-error";
  let errorEl = document.getElementById(ERROR_ID);
  if (!errorEl) {
    errorEl = document.createElement("div");
    errorEl.id = ERROR_ID;
 
    errorEl.classList.add("forgotpw-error");
    errorEl.setAttribute("role", "status");
    errorEl.setAttribute("aria-live", "polite");
    
    const parent = emailInput.parentElement || document.body;
    parent.appendChild(errorEl);
  }

  const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

  function showError(msg) {
    errorEl.textContent = msg;
    
    errorEl.classList.add("visible");
   
    try {
      errorEl.style.opacity = "1";
      errorEl.style.transform = "translateY(0)";
      errorEl.style.pointerEvents = "auto";
      errorEl.style.display = "block";
    } catch (e) {
    
    }
  }

  function clearError() {
 
    errorEl.textContent = "";
    errorEl.classList.remove("visible");
    try {
      errorEl.style.opacity = "0";
      errorEl.style.transform = "translateY(6px)";
      errorEl.style.pointerEvents = "none";
     
    } catch (e) {
     
    }
  }

  function validateEmail() {
    const v = (emailInput.value || "").trim();
    if (!v) {
      showError("Harap masukkan email.");
      return false;
    }
    if (!gmailPattern.test(v)) {
      showError("Alamat harus berakhiran @gmail.com");
      return false;
    }
    clearError();
    return true;
  }

  function submitAction() {
    if (validateEmail()) {
    
      window.location.href = "/index.html";
    }
  }

  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      submitAction();
    });
  }

  emailInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitAction();
    }
  });

  emailInput.addEventListener("input", () => {
    if (!emailInput.value) {
      clearError();
    } else {
   
      if (!gmailPattern.test(emailInput.value.trim())) {
        showError("Alamat harus berakhiran @gmail.com");
      } else {
        clearError();
      }
    }
  });
});
