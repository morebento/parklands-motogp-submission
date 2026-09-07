/*
 * Central form state + step navigation. No persistence beyond the in-memory
 * object (spec 7.2 — nothing typed here is stored outside the tab).
 */
(function () {
  const STEP_COUNT = 8; // 0 = landing, 1..6 = wizard steps, 7 = send

  const state = {
    step: 0,
    connectionChips: [], // array of chip ids
    connectionText: "",
    concernIds: [], // array of concern item ids (from any category)
    personalStatement: "", // Step 3 — the submitter's own words
    askIds: [], // array of ask ids
    particulars: {
      name: "",
      suburb: "",
      postcode: "",
      streetAddress: "",
      email: "",
    },
    aplaCc: false,
    letterText: "", // current letter shown in Step 5 textarea
    letterManuallyEdited: false,
  };

  function toggleInArray(arr, id) {
    const i = arr.indexOf(id);
    if (i === -1) arr.push(id);
    else arr.splice(i, 1);
    return arr;
  }

  function canLeaveStep(step) {
    if (step === 4) {
      return state.askIds.length > 0;
    }
    if (step === 5) {
      return (
        state.particulars.name.trim().length > 0 &&
        state.particulars.suburb.trim().length > 0 &&
        /^\d{4}$/.test(state.particulars.postcode.trim())
      );
    }
    return true;
  }

  function stepValidationMessage(step) {
    if (step === 4 && state.askIds.length === 0) {
      return "Please choose at least one thing you're asking the Government to do.";
    }
    if (step === 5) {
      if (!state.particulars.name.trim()) return "Please enter your full name.";
      if (!state.particulars.suburb.trim()) return "Please enter your suburb.";
      if (!/^\d{4}$/.test(state.particulars.postcode.trim()))
        return "Please enter a valid 4-digit postcode.";
    }
    return "";
  }

  window.AppState = {
    state,
    STEP_COUNT,
    toggleInArray,
    canLeaveStep,
    stepValidationMessage,
  };
})();
