document.addEventListener("DOMContentLoaded", function () {
    const emailLink = document.getElementById("emailLink");

    if (emailLink) {
        emailLink.addEventListener("click", function (event) {
            event.preventDefault();

            const recipient = "nedy.mutisya@gmail.com";
            const subject = "Virtual Assistant Project Enquiry";
            const body =
                "Hello Kennedy,\n\n" +
                "I would like to discuss your Virtual Assistant services.";

            const mailto =
                "mailto:" + recipient +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);

            window.location.href = mailto;
        });
    }
});

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

const imageModal = document.getElementById("imageModal");
const modalTitle = document.getElementById("modalTitle");
const modalGallery = document.getElementById("modalGallery");
const closeModalButton = document.getElementById("closeModal");

let lastFocusedButton = null;

document.querySelectorAll(".tag").forEach(button => {
  button.addEventListener("click", () => {
    lastFocusedButton = button;
    modalTitle.textContent = button.dataset.title;
    modalGallery.replaceChildren();

    const images = button.dataset.images.split(",");

    images.forEach((src, index) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const caption = document.createElement("figcaption");

      img.src = src.trim();
      img.alt = `${button.dataset.title}, image ${index + 1}`;
      img.loading = "lazy";

      img.addEventListener("error", () => {
        caption.textContent =
          `Image not found: ${src.trim()}. Add the image to your project-images folder.`;
        caption.style.color = "#b42318";
        img.style.display = "none";
      });

      caption.textContent = `Project image ${index + 1}`;

      // Open the full-size image in a separate tab.
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => {
        if (img.naturalWidth > 0) {
          window.open(img.src, "_blank", "noopener,noreferrer");
        }
      });

      figure.append(img, caption);
      modalGallery.appendChild(figure);
    });

    imageModal.hidden = false;
    document.body.style.overflow = "hidden";
    closeModalButton.focus();
  });
});

function closeProjectModal() {
  imageModal.hidden = true;
  document.body.style.overflow = "";
  modalGallery.replaceChildren();

  if (lastFocusedButton) {
    lastFocusedButton.focus();
  }
}

closeModalButton.addEventListener("click", closeProjectModal);

imageModal.addEventListener("click", event => {
  if (event.target === imageModal) {
    closeProjectModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !imageModal.hidden) {
    closeProjectModal();
  }
});
