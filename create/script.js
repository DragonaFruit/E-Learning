document.addEventListener("DOMContentLoaded", () => {
      const inputs = document.querySelectorAll(".no");

      inputs.forEach((input, index) => {
        // Saat user mengetik
        input.addEventListener("input", (e) => {
          const value = e.target.value.replace(/[^0-9]/g, "");
          e.target.value = value;

          if (value !== "") {
            e.target.classList.add("filled");

            // Pindah otomatis ke input berikutnya
            if (index < inputs.length - 1) {
              inputs[index + 1].focus();
            }
          } else {
            e.target.classList.remove("filled");
          }
        });

        // Saat user menekan tombol
        input.addEventListener("keydown", (e) => {
          if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputs[index - 1].focus();
          }
        });

        // Saat kehilangan fokus (biar warna tetap)
        input.addEventListener("blur", () => {
          if (input.value) {
            input.classList.add("filled");
          } else {
            input.classList.remove("filled");
          }
        });
      });
    });