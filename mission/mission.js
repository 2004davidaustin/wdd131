let selectElem = document.querySelector('#theme-select');
let pageContent = document.querySelector('body');
const image = document.querySelector('img');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current === 'light') {
        console.log(`yo whaddap`);
        image.setAttribute('src', 'https://wddbyui.github.io/wdd131/images/byui-logo-blue.webp');
        document.documentElement.style.setProperty('--background', 'white');
        document.documentElement.style.setProperty('--text-color', 'black');
        document.documentElement.style.setProperty('--accent-color', 'navy');
        document.documentElement.style.setProperty('--border-color', 'darkgrey');
    } else if (current === 'dark') {
        image.setAttribute('src', 'https://wddbyui.github.io/wdd131/images/byui-logo-white.png');
        document.documentElement.style.setProperty('--background', '#333');
        document.documentElement.style.setProperty('--text-color', 'white');
        document.documentElement.style.setProperty('--accent-color', 'lightblue');
        document.documentElement.style.setProperty('--border-color', '#888888');
    }
}