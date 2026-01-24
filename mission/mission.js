// Select DOM elements
const selectElem = document.querySelector("#theme-select");
const pageContent = document.querySelector("body");
const logoImage = document.querySelector("img");

// Add event listener
selectElem.addEventListener("change", changeTheme);

function changeTheme() {
  const current = selectElem.value;

  if (current === "light") {
    logoImage.setAttribute("src", "https://wddbyui.github.io/wdd131/images/byui-logo-blue.webp");
    pageContent.classList.remove("dark");
  } else if (current === "dark") {
    logoImage.setAttribute("src", "https://wddbyui.github.io/wdd131/images/byui-logo-white.png");
    pageContent.classList.add("dark");
  }
}
