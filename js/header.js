// /js/header.js
document.addEventListener("DOMContentLoaded", async () => {
  const mount = document.getElementById("site-header");
  if (!mount) return;

  try {
    const res = await fetch("/partials/header.html", { cache: "no-cache" });
    if (!res.ok) throw new Error(`Failed to load header: ${res.status}`);
    const html = await res.text();
    mount.innerHTML = html;

    // 現在のパスに応じてアクティブなメニューを自動ハイライト
    const current = location.pathname.replace(/\/+$/, "") || "/";
    const list = mount.querySelector('ul[data-active-by="path"]');
    if (list) {
      list.querySelectorAll("a.nav-link").forEach((a) => {
        const p = (a.getAttribute("data-path") || "").replace(/\/+$/, "") || "/";
        if (p === current || (p !== "/" && current.endsWith(p))) {
          a.classList.add("active");
          a.setAttribute("aria-current", "page");
        } else {
          a.classList.remove("active");
          a.removeAttribute("aria-current");
        }
      });
    }

  } catch (e) {
    console.error(e);
  }
});
