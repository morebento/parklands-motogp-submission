/*
 * Live countdown to the consultation deadline (spec 7.6).
 * Target is a fixed instant (ACST, UTC+9:30) — no DST ambiguity since the
 * deadline itself falls before SA's ACDT period begins.
 */
(function () {
  function getRemaining() {
    const target = new Date(CONTENT.meta.deadlineISO).getTime();
    const now = Date.now();
    return Math.max(0, target - now);
  }

  function formatRemaining(ms) {
    if (ms <= 0) return "The consultation has closed.";
    const totalMinutes = Math.floor(ms / 60000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    const parts = [];
    parts.push(days + (days === 1 ? " day" : " days"));
    parts.push(hours + (hours === 1 ? " hour" : " hours"));
    if (days === 0) {
      parts.push(minutes + (minutes === 1 ? " minute" : " minutes"));
    }
    return parts.join(", ") + " left to have your say";
  }

  function startCountdown(renderTargets) {
    function tick() {
      const text = formatRemaining(getRemaining());
      renderTargets.forEach((el) => {
        if (el) el.textContent = text;
      });
    }
    tick();
    return setInterval(tick, 60 * 1000);
  }

  window.Countdown = { getRemaining, formatRemaining, startCountdown };
})();
