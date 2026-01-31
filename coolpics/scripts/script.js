// DROP DOWN MENU CODE

const btn = document.querySelector(".menu-btn");
const menu = document.querySelector("nav");

btn.addEventListener("click", toggleMenu);

function toggleMenu() {
  menu.classList.toggle("hide-nav");
}

// MODAL CODE

const gallery = document.querySelector("#gallery");
const modal = document.querySelector("dialog");

// returns the modal template
function viewerTemplate(src, alt) {
  return `
    <img src="${src}" alt="${alt}">
    <button class="close-viewer">X</button>
  `;
}

// Event listener for opening the modal
gallery.addEventListener("click", openModal);

function openModal(e) {
  const img = e.target;

  const src = img.getAttribute("src");
  const alt = img.getAttribute("alt");
  const full = src.replace("sm", "full");

  modal.innerHTML = viewerTemplate(full, alt);
  modal.showModal();
}

// close when you click the backdrop or button
modal.addEventListener("click", (event) => {
  if (event.target === modal || event.target.matches(".close-viewer")) {
    modal.close();
  }
});
