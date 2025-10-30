document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("username");
  const btn =
    document.querySelector(".tengah .btn") ||
    document.querySelector("button.btn");

  if (!emailInput) return; // nothing to do

  // Hapus atribut onclick inline jika ada, supaya kita bisa kontrol submit dari JS
  if (btn && btn.hasAttribute && btn.hasAttribute("onclick")) {
    btn.removeAttribute("onclick");
  }

  // Buat elemen error jika belum ada
  const ERROR_ID = "forgotpw-email-error";
  let errorEl = document.getElementById(ERROR_ID);
  if (!errorEl) {
    errorEl = document.createElement("div");
    errorEl.id = ERROR_ID;
    // gunakan kelas CSS, bukan style inline
    errorEl.classList.add("forgotpw-error");
    errorEl.setAttribute("role", "status");
    errorEl.setAttribute("aria-live", "polite");
    // Sisipkan setelah .kotak (parent dari input)
    const parent = emailInput.parentElement || document.body;
    parent.appendChild(errorEl);
  }

  const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

  function showError(msg) {
    errorEl.textContent = msg;
    // tambahkan kelas visible untuk memicu animasi CSS
    errorEl.classList.add("visible");
    // fallback inline styles: jika CSS gagal dimuat atau tidak kompatibel,
    // pastikan pesan tetap terlihat
    try {
      errorEl.style.opacity = "1";
      errorEl.style.transform = "translateY(0)";
      errorEl.style.pointerEvents = "auto";
      errorEl.style.display = "block";
    } catch (e) {
      /* ignore */
    }
  }

  function clearError() {
    // hapus pesan dan kelas visible
    errorEl.textContent = "";
    errorEl.classList.remove("visible");
    try {
      errorEl.style.opacity = "0";
      errorEl.style.transform = "translateY(6px)";
      errorEl.style.pointerEvents = "none";
      // jangan set display:none untuk menjaga layout stabil; CSS mengatur transisi
    } catch (e) {
      /* ignore */
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
      // Lolos validasi — lanjutkan (saat ini redirect ke halaman utama)
      window.location.href = "/index.html";
    }
  }

  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      submitAction();
    });
  }

  // Tangani Enter pada input
  emailInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitAction();
    }
  });

  // Validasi saat user mengetik (untuk feedback)
  emailInput.addEventListener("input", () => {
    if (!emailInput.value) {
      clearError();
    } else {
      // hanya tampilkan kesalahan saat tidak sesuai
      if (!gmailPattern.test(emailInput.value.trim())) {
        showError("Alamat harus berakhiran @gmail.com");
      } else {
        clearError();
      }
    }
  });
});
