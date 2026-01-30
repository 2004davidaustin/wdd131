const btn = document.querySelector(".menu-btn");
const menu = document.querySelector("nav");

btn.addEventListener("click", toggleMeun);

function toggleMeun() {
  menu.classList.toggle("hide");
  btn.classList.toggle("change");
}
