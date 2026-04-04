// load itinerary html
fetch('partials/timeline.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('timeline-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error loading partial:', err));



    

//nav menu
const btn = document.querySelector(".menu-btn");
const tray = document.getElementById("nav-tray");
const overlay = document.getElementById("nav-overlay");

function openMenu() {
  tray.classList.add("open");
  overlay.classList.add("active");
  btn.classList.add("change");
  btn.setAttribute("aria-expanded", "true");
  tray.setAttribute("aria-hidden", "false");
}

function closeMenu() {
  tray.classList.remove("open");
  overlay.classList.remove("active");
  btn.classList.remove("change");
  btn.setAttribute("aria-expanded", "false");
  tray.setAttribute("aria-hidden", "true");
}

btn.addEventListener("click", () => {
  tray.classList.contains("open") ? closeMenu() : openMenu();
});

overlay.addEventListener("click", closeMenu);

// Close on nav link click
tray.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));








// copy button

const feedbackEl = document.getElementById("feedback");

function showFeedback(message, type = "success", duration = 2500) {
  if (!feedbackEl) return;
  feedbackEl.textContent = message;
  feedbackEl.classList.remove("success", "error");
  feedbackEl.classList.add(type, "visible");
  setTimeout(() => {
    feedbackEl.classList.remove("visible");
  }, duration);
}

const copyBtn = document.getElementById("copyInfoBtn");
const infoEl = document.querySelector(".info-box");
const fallbackText = `Nombre: Kenia Lagunes\nBanco: BBVA\nCuenta CLABE: 012 180 01548830608 3\nCuenta: 154 883 0608\nConcepto: Regalo de Boda`;

async function copyInfo() {
  const text = infoEl ? infoEl.innerText.trim() : fallbackText;
  try {
    await navigator.clipboard.writeText(text);
    showToast("Info Copied ✅", 2500);
  } catch (err) {
    showToast("Couldn't Copy ⚠️", 2500);
  }
}

if (copyBtn) copyBtn.addEventListener("click", copyInfo);

window.showFeedback = showFeedback;

// --- Show toast function ---
function showToast(message, duration = 3000) {
  const toastEl = document.getElementById("toast");
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastEl._hideTimer);
  toastEl._hideTimer = setTimeout(() => {
    toastEl.classList.remove("show");
  }, duration);
}









// WISH WALL

     // --- Premade wishes array ---
    const wishes = [
      { name: "Aunt Josefina",   relation: "Bride's aunt",    message: "Wishing you a lifetime of love and laughter!", date: "Mar 28, 2026" },
      { name: "Jake & Mia",   relation: "College friends", message: "So happy for you both. Cheers to forever!", date: "Mar 30, 2026" },
      { name: "Grandma Rose", relation: "Groom's grandma", message: "May every day together be better than the last.", date: "Apr 1, 2026" }
    ];
 
    // --- Add a new wish to the array ---
    function addWish() {
      const name     = document.getElementById("name").value.trim();
      const relation = document.getElementById("relation").value.trim();
      const message  = document.getElementById("message").value.trim();
 
      if (!name || !message) { alert("Please enter your name and a wish!"); return; }

      const today = new Date();
      const dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
 
      wishes.push({ name, relation, message, date: dateStr });
 
      document.getElementById("name").value     = "";
      document.getElementById("relation").value = "";
      document.getElementById("message").value  = "";
 
      renderWishes();
      showToast("Wish sent", 3000);
    }
 
    // --- Loop through the array and display each wish ---
    function renderWishes() {
      const container = document.getElementById("wishes");
      const countEl = document.getElementById("ww-count");
      const emptyEl = document.getElementById("ww-empty");
      
      container.innerHTML = "";
 
      if (wishes.length === 0) {
        if (emptyEl) emptyEl.style.display = "block";
        if (countEl) countEl.style.display = "none";
      } else {
        if (emptyEl) emptyEl.style.display = "none";
        if (countEl) {
          countEl.style.display = "block";
          countEl.textContent = `Wishes (${wishes.length})`;
        }
      }
 
      for (let i = 0; i < wishes.length; i++) {
        const w   = wishes[i];
        const div = document.createElement("div");
        div.className = "card in";
        div.innerHTML = `
          <div class="card-msg">${w.message}</div>
          <div class="card-from">
            <div class="card-from-left">
              <div class="card-name">${w.name}</div>
              ${w.relation ? `<div class="card-rel">${w.relation}</div>` : ""}
            </div>
            ${w.date ? `<div class="card-date">${w.date}</div>` : ""}
          </div>
        `;
        container.appendChild(div);
      }
    }
 
    renderWishes();

    document.getElementById('ww-btn').addEventListener('click', addWish);




    // COUNT DOWN

     function tick() {
    const target = new Date('2026-05-22T00:00:00');
    const now = new Date();
    const diff = target - now;
    const grid = document.getElementById('cd-grid');
    if (diff <= 0) {
      grid.innerHTML = '<div class="cd-done">Today is the day!</div>';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const units = [{v:d,l:'days'},{v:h,l:'hours'},{v:m,l:'min'},{v:s,l:'sec'}];
    grid.innerHTML = units.map(u => `
      <div class="cd-box">
        <div class="cd-num">${String(u.v).padStart(2,'0')}</div>
        <div class="cd-unit">${u.l}</div>
      </div>
    `).join('');
  }
  tick();
  setInterval(tick, 1000);