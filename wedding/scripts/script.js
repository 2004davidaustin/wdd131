// load timeline html because its too freaking long by itself
fetch('partials/timeline.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('timeline-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error loading partial:', err));

// fracking copy feedback that's way too long
      (function () {
        const feedbackEl = document.getElementById("feedback");

        function showFeedback(
          message,
          { duration = 2500, type = "success" } = {},
        ) {
          if (!feedbackEl) return;
          feedbackEl.textContent = message;
          feedbackEl.classList.remove("success", "error");
          feedbackEl.classList.add(type, "visible");

          const height = Math.min(feedbackEl.offsetHeight || 48, 56);
          document.body.style.setProperty("--feedback-height", `${height}px`);
          document.body.classList.add("feedback-visible");

          clearTimeout(feedbackEl._hideTimer);
          feedbackEl._hideTimer = setTimeout(() => {
            feedbackEl.classList.remove("visible");
            document.body.classList.remove("feedback-visible");
          }, duration);
        }

        if (feedbackEl) {
          feedbackEl.addEventListener("transitionend", (e) => {
            if (
              e.propertyName.includes("transform") &&
              !feedbackEl.classList.contains("visible")
            ) {
              document.body.style.removeProperty("--feedback-height");
            }
          });
        }

        const copyBtn = document.getElementById("copyInfoBtn");
        const infoEl = document.querySelector(".info-box");
        const fallbackText = `Nombre: Kenia Lagunes\nBanco: BBVA\nCuenta CLABE: 012 180 01548830608 3\nCuenta: 154 883 0608\nConcepto: Regalo de Boda`;

        function showButtonMessage(btn, message, { duration = 5000 } = {}) {
          if (!btn) return;
          if (!btn.dataset.origText) btn.dataset.origText = btn.textContent;
          btn.textContent = message;
          btn.disabled = true;
          btn.setAttribute("aria-live", "polite");
          clearTimeout(btn._resetTimer);
          btn._resetTimer = setTimeout(() => {
            btn.textContent = btn.dataset.origText;
            btn.disabled = false;
          }, duration);
        }

        async function copyInfo() {
          const text = infoEl ? infoEl.innerText.trim() : fallbackText;
          try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              await navigator.clipboard.writeText(text);
            } else {
              const ta = document.createElement("textarea");
              ta.value = text;
              ta.style.position = "fixed";
              ta.style.left = "-9999px";
              document.body.appendChild(ta);
              ta.select();
              document.execCommand("copy");
              document.body.removeChild(ta);
            }
            // temporarily show message inside the button to keep design consistent
            showButtonMessage(copyBtn, "Información copiada ✅", {
              duration: 2500,
            });
          } catch (err) {
            showButtonMessage(copyBtn, "No se pudo copiar ⚠️", {
              duration: 2500,
            });
          }
        }

        if (copyBtn) copyBtn.addEventListener("click", copyInfo);

        window.showFeedback = showFeedback;
      })();