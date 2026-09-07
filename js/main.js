(function () {
  const { state, canLeaveStep, stepValidationMessage, toggleInArray } = window.AppState;

  const STEP_LABELS = {
    1: "Your connection",
    2: "Your concerns",
    3: "Your words",
    4: "Your asks",
    5: "Your particulars",
    6: "Review",
    7: "Send",
  };

  // ---------- letter text helpers ----------

  function currentLetterText() {
    return state.letterManuallyEdited ? state.letterText : Letter.buildLetter(state);
  }

  function renderPreview() {
    const text = currentLetterText();
    const livePreview = document.getElementById("live-preview");
    if (livePreview) livePreview.textContent = text || "Your submission will appear here as you go.";
  }

  // ---------- one-time static content ----------

  function renderFactStrip() {
    const el = document.getElementById("fact-strip");
    el.innerHTML = "";
    CONTENT.headlineFacts.forEach((fact) => {
      const li = document.createElement("li");
      li.innerHTML = "<strong>" + fact.stat + "</strong> " + fact.detail;
      el.appendChild(li);
    });
  }

  function renderChips() {
    const el = document.getElementById("connection-chips");
    el.innerHTML = "";
    CONTENT.connectionChips.forEach((chip) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.textContent = chip.label;
      btn.setAttribute("aria-pressed", "false");
      btn.dataset.chipId = chip.id;
      btn.addEventListener("click", () => {
        toggleInArray(state.connectionChips, chip.id);
        const pressed = state.connectionChips.includes(chip.id);
        btn.setAttribute("aria-pressed", String(pressed));
        btn.classList.toggle("chip--selected", pressed);
        renderPreview();
      });
      el.appendChild(btn);
    });
  }

  function renderConcernCategories() {
    const container = document.getElementById("concern-categories");
    container.innerHTML = "";
    CONTENT.categories.forEach((category) => {
      const fieldset = document.createElement("fieldset");
      fieldset.className = "checkbox-group";

      const legend = document.createElement("legend");
      legend.textContent = category.heading;
      fieldset.appendChild(legend);

      category.items.forEach((item) => {
        const label = document.createElement("label");
        label.className = "checkbox-row";

        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = "concern-" + item.id;
        input.addEventListener("change", () => {
          toggleInArray(state.concernIds, item.id);
          renderPreview();
        });

        label.appendChild(input);
        label.appendChild(document.createTextNode(item.label));
        fieldset.appendChild(label);
      });

      container.appendChild(fieldset);
    });
  }

  function updateYourWordsNudge() {
    const nudge = document.getElementById("your-words-nudge");
    const show = state.concernIds.length >= 3 && !state.personalStatement.trim();
    nudge.hidden = !show;
  }

  function renderYourWords() {
    const copy = CONTENT.yourWords;
    document.getElementById("your-words-intro").textContent = copy.intro;
    document.getElementById("your-words-label").textContent = copy.label;

    const examples = document.getElementById("your-words-examples");
    examples.innerHTML = "";
    copy.examples.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = "“" + text + "”";
      examples.appendChild(li);
    });
    document.getElementById("your-words-nudge").textContent = copy.nudge;

    const textarea = document.getElementById("your-words-text");
    textarea.addEventListener("input", () => {
      state.personalStatement = textarea.value;
      renderPreview();
      updateYourWordsNudge();
    });
  }

  function renderAsks() {
    const container = document.getElementById("asks-list");
    container.innerHTML = "";
    CONTENT.asks.forEach((ask) => {
      const label = document.createElement("label");
      label.className = "checkbox-row";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = "ask-" + ask.id;
      input.addEventListener("change", () => {
        toggleInArray(state.askIds, ask.id);
        renderPreview();
        hideError("step-4-error");
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(ask.label));
      container.appendChild(label);
    });
  }

  function bindParticulars() {
    const fields = [
      ["p-name", "name"],
      ["p-suburb", "suburb"],
      ["p-postcode", "postcode"],
      ["p-address", "streetAddress"],
      ["p-email", "email"],
    ];
    fields.forEach(([id, key]) => {
      const input = document.getElementById(id);
      input.addEventListener("input", () => {
        state.particulars[key] = input.value;
        renderPreview();
        hideError("step-5-error");
      });
    });
  }

  function bindLetterTextarea() {
    const textarea = document.getElementById("letter-preview");
    textarea.addEventListener("input", () => {
      state.letterManuallyEdited = true;
      state.letterText = textarea.value;
      renderPreview();
    });
  }

  function bindAplaCc() {
    document.getElementById("apla-cc-checkbox").addEventListener("change", (e) => {
      state.aplaCc = e.target.checked;
    });
  }

  // ---------- step navigation ----------

  function showError(id, message) {
    const el = document.getElementById(id);
    el.textContent = message;
    el.hidden = false;
    el.scrollIntoView({ block: "center" });
  }

  function hideError(id) {
    const el = document.getElementById(id);
    el.hidden = true;
  }

  function renderProgress() {
    const list = document.getElementById("progress");
    list.innerHTML = "";
    Object.keys(STEP_LABELS).forEach((stepNum) => {
      const n = Number(stepNum);
      const li = document.createElement("li");
      li.textContent = STEP_LABELS[n];
      if (n === state.step) {
        li.setAttribute("aria-current", "step");
        li.classList.add("progress__item--current");
      } else if (n < state.step) {
        li.classList.add("progress__item--done");
      }
      list.appendChild(li);
    });
  }

  function showStep(stepNum) {
    document.querySelectorAll(".wizard__form .step").forEach((section) => {
      section.hidden = Number(section.dataset.step) !== stepNum;
    });

    if (stepNum === 3) {
      updateYourWordsNudge();
    }

    if (stepNum === 6) {
      document.getElementById("letter-preview").value = currentLetterText();
    }

    document.getElementById("btn-back").hidden = false;
    const nextBtn = document.getElementById("btn-next");
    nextBtn.textContent = stepNum === 7 ? "Finish" : "Next";

    renderProgress();
    renderPreview();

    const section = document.querySelector('.wizard__form .step[data-step="' + stepNum + '"]');
    if (section) {
      section.scrollIntoView({ block: "start" });
      const heading = section.querySelector("h2");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    }
  }

  function goToStep(newStep) {
    state.step = newStep;
    showStep(newStep);
  }

  function handleNext() {
    if (!canLeaveStep(state.step)) {
      const errId = state.step === 4 ? "step-4-error" : "step-5-error";
      showError(errId, stepValidationMessage(state.step));
      return;
    }
    if (state.step === 7) {
      finishWizard();
      return;
    }
    goToStep(state.step + 1);
  }

  function focusAndScroll(el) {
    if (!el) return;
    el.scrollIntoView({ block: "start" });
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }

  function handleBack() {
    if (state.step === 1) {
      // back to landing
      document.getElementById("wizard").hidden = true;
      document.getElementById("step-0").hidden = false;
      state.step = 0;
      focusAndScroll(document.querySelector("#step-0 h1"));
      return;
    }
    goToStep(state.step - 1);
  }

  function startWizard() {
    document.getElementById("step-0").hidden = true;
    document.getElementById("wizard").hidden = false;
    goToStep(1);
  }

  function finishWizard() {
    document.getElementById("wizard").hidden = true;
    document.getElementById("step-done").hidden = false;
    focusAndScroll(document.querySelector("#step-done h2"));
  }

  function restart() {
    state.step = 0;
    state.connectionChips = [];
    state.connectionText = "";
    state.concernIds = [];
    state.personalStatement = "";
    state.askIds = [];
    state.particulars = { name: "", suburb: "", postcode: "", streetAddress: "", email: "" };
    state.aplaCc = false;
    state.letterText = "";
    state.letterManuallyEdited = false;

    document.querySelectorAll(".chip").forEach((btn) => {
      btn.setAttribute("aria-pressed", "false");
      btn.classList.remove("chip--selected");
    });
    document.querySelectorAll('#concern-categories input[type="checkbox"]').forEach((el) => (el.checked = false));
    document.querySelectorAll('#asks-list input[type="checkbox"]').forEach((el) => (el.checked = false));
    document.getElementById("connection-text").value = "";
    document.getElementById("your-words-text").value = "";
    document.getElementById("your-words-nudge").hidden = true;
    document.getElementById("p-name").value = "";
    document.getElementById("p-suburb").value = "";
    document.getElementById("p-postcode").value = "";
    document.getElementById("p-address").value = "";
    document.getElementById("p-email").value = "";
    document.getElementById("apla-cc-checkbox").checked = false;
    document.getElementById("letter-preview").value = "";

    document.getElementById("step-done").hidden = true;
    document.getElementById("step-0").hidden = false;
    focusAndScroll(document.querySelector("#step-0 h1"));
  }

  // ---------- send actions (step 6) ----------

  function setActionStatus(message) {
    document.getElementById("action-status").textContent = message;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
    } finally {
      document.body.removeChild(textarea);
    }
    return Promise.resolve();
  }

  function handleOpenEmail() {
    const text = currentLetterText();
    const result = MailtoBuilder.buildMailto(text, state.aplaCc);
    const fallbackNote = document.getElementById("mailto-fallback-note");

    if (result.truncated) {
      fallbackNote.hidden = false;
      copyText(text).then(() => setActionStatus("Copied your submission to the clipboard."));
    } else {
      fallbackNote.hidden = true;
    }
    window.location.href = result.href;
  }

  function handleCopyText() {
    copyText(currentLetterText()).then(() => setActionStatus("Copied your submission to the clipboard."));
  }

  function handleDownloadPdf() {
    PdfExport.downloadPdf(currentLetterText(), state.particulars.suburb || state.particulars.name);
    setActionStatus("PDF downloaded.");
  }

  function handleDownloadTxt() {
    const text = currentLetterText();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "motogp-submission.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setActionStatus("Text file downloaded.");
  }

  // ---------- init ----------

  function init() {
    renderFactStrip();
    renderChips();
    renderConcernCategories();
    renderYourWords();
    renderAsks();
    bindParticulars();
    bindLetterTextarea();
    bindAplaCc();

    document.getElementById("official-survey-link").href = CONTENT.meta.officialSurveyUrl;

    document.querySelector('[data-action="start"]').addEventListener("click", startWizard);
    document.getElementById("btn-next").addEventListener("click", handleNext);
    document.getElementById("btn-back").addEventListener("click", handleBack);
    document.querySelector('[data-action="restart"]').addEventListener("click", restart);

    document.querySelector('[data-action="open-email"]').addEventListener("click", handleOpenEmail);
    document.querySelector('[data-action="copy-text"]').addEventListener("click", handleCopyText);
    document.querySelector('[data-action="download-pdf"]').addEventListener("click", handleDownloadPdf);
    document.querySelector('[data-action="download-txt"]').addEventListener("click", handleDownloadTxt);

    document.getElementById("connection-text").addEventListener("input", (e) => {
      state.connectionText = e.target.value;
      renderPreview();
    });

    const countdownTargets = [
      document.getElementById("header-countdown"),
      document.getElementById("landing-countdown"),
    ];
    Countdown.startCountdown(countdownTargets);

    renderPreview();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
