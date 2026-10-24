document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();

  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".topnav");
  const showAll = document.getElementById("showAll");
  const extraProjects = document.querySelectorAll(".extra-project");

  document.getElementById("year").textContent = new Date().getFullYear();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const icon = themeToggle.querySelector("i");
    if (icon && window.lucide) {
      icon.setAttribute("data-lucide", document.body.classList.contains("light-mode") ? "sun" : "moon");
      window.lucide.createIcons();
    }
  });

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    const icon = menuToggle.querySelector("i");
    if (icon && window.lucide) {
      icon.setAttribute("data-lucide", isOpen ? "x" : "menu");
      window.lucide.createIcons();
    }
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });

  let expanded = false;
  showAll.addEventListener("click", () => {
    expanded = !expanded;
    extraProjects.forEach(project => project.hidden = !expanded);
    showAll.textContent = expanded ? "Show Less ↑" : "View All Projects →";
  });
});