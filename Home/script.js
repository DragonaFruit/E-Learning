(function () {
  const links = document.querySelectorAll("nav ul li a");

  function clearActive() {
    links.forEach((l) => {
      l.classList.remove("active-underline", "active-glow");
      l.removeAttribute("aria-current");
    });
  }

  const hashMap = Array.from(links)
    .map((a) => ({ el: a, href: a.getAttribute("href") }))
    .filter((x) => x.href && x.href.startsWith("#") && x.href.length > 1)
    .map((x) => ({ link: x.el, section: document.querySelector(x.href) }))
    .filter((x) => x.section);

  if (hashMap.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const match = hashMap.find((m) => m.section === entry.target);
            if (match) {
              clearActive();
              match.link.classList.add("active-underline");
              match.link.setAttribute("aria-current", "page");
            }
          }
        });
      },
      { threshold: [0.5] }
    );
    hashMap.forEach((m) => observer.observe(m.section));
  }

  function markByPath() {
    const path = location.pathname.toLowerCase();
    const hash = location.hash.toLowerCase();

    if (hash) {
      const link = Array.from(links).find(
        (a) => a.getAttribute("href") === hash
      );
      if (link) {
        clearActive();
        link.classList.add("active-underline");
        link.setAttribute("aria-current", "page");
        return;
      }
    }

    if (path.endsWith("/") || path.endsWith("index.html")) {
      const home = Array.from(links).find(
        (a) =>
          (a.getAttribute("href") || "").toLowerCase() === "#home" ||
          a.textContent.trim().toLowerCase() === "home"
      );
      if (home) {
        clearActive();
        home.classList.add("active-underline");
        home.setAttribute("aria-current", "page");
        return;
      }
    }
    const learn = Array.from(links).find((a) => {
      const text = a.textContent.trim().toLowerCase();
      return (
        text.includes("learn") ||
        (a.href && a.href.toLowerCase().includes("/learn"))
      );
    });
    if (learn) {
      clearActive();
      learn.classList.add("active-glow");
      learn.setAttribute("aria-current", "page");
    }
  }

  window.addEventListener("hashchange", markByPath);
  window.addEventListener("popstate", markByPath);
  document.addEventListener("DOMContentLoaded", markByPath);
})();
