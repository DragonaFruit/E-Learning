      document.addEventListener("DOMContentLoaded", () => {
        const btn = document.getElementById("proceedBtn");
        const countdownEl = document.getElementById("countdown");
        let seconds = 60;
        const target = window.location.origin + "/signin/index.html";

        const interval = setInterval(() => {
          seconds -= 1;
          countdownEl.textContent = seconds;
          if (seconds <= 0) {
            clearInterval(interval);
            window.location.href = target;
          }
        }, 1000);

        btn.addEventListener("click", () => {
          clearInterval(interval);
          window.location.href = target;
        });
      });
    
    