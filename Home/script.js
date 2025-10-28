(function () {
  const links = document.querySelectorAll("nav ul li a");
  const path = location.pathname.toLowerCase();
  const hash = location.hash.toLowerCase();
  links.forEach((a) => {
    const href = a.getAttribute("href") || "";
    const text = a.textContent.trim().toLowerCase();

    if (href.startsWith("#")) {
      if (hash && href.toLowerCase() === hash) {
        a.classList.add("active-underline");
      } else if (
        !hash &&
        (path.endsWith("/") || path.endsWith("index.html")) &&
        (href === "#home" || text === "home")
      ) {
        a.classList.add("active-underline");
      }
    } else {
      try {
        const url = new URL(href, location.href);
        const hrefPath = url.pathname.toLowerCase();
        if (hrefPath !== "/" && path.includes(hrefPath)) {
          if (text.includes("learn") || hrefPath.includes("learn"))
            a.classList.add("active-glow");
          else a.classList.add("active-underline");
        }
      } catch (e) {
        if (text && path.includes(text)) {
          if (text.includes("learn")) a.classList.add("active-glow");
          else a.classList.add("active-underline");
        }
      }
    }
  });
})();
