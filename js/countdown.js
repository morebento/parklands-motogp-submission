/*
 * Live countdown to the consultation deadline (spec 7.6).
 * Target is a fixed instant (ACST, UTC+9:30) — no DST ambiguity since the
 * deadline itself falls before SA's ACDT period begins.
 *
 * Also drives the landing-page progress graphic: a 🏍️ that travels the track
 * toward the 🌳 as the consultation window elapses.
 */
(function () {
  function getRemaining() {
    const target = new Date(CONTENT.meta.deadlineISO).getTime();
    const now = Date.now();
    return Math.max(0, target - now);
  }

  // Fraction (0..1) of the way through the consultation window.
  function getProgress() {
    const start = new Date(CONTENT.meta.consultationOpenISO).getTime();
    const end = new Date(CONTENT.meta.deadlineISO).getTime();
    const now = Date.now();
    if (!(end > start)) return 0;
    if (now <= start) return 0;
    if (now >= end) return 1;
    return (now - start) / (end - start);
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

  function quipFor(ms, pct) {
    if (ms <= 0) return CONTENT.countdown.closed;
    const band = CONTENT.countdown.quips.find((q) => pct <= q.untilPct);
    return band ? band.text : "";
  }

  function renderBar(bar, ms) {
    const fraction = getProgress();
    const pct = Math.round(fraction * 100);
    // Keep the rider clear of the goal emoji at the far right.
    const riderPct = Math.min(pct, 92);

    if (bar.track) bar.track.setAttribute("aria-valuenow", String(pct));
    if (bar.fill) bar.fill.style.width = pct + "%";
    if (bar.rider) bar.rider.style.left = riderPct + "%";
    if (bar.goal) bar.goal.textContent = ms <= 0 ? "🪵" : "🌳";
    if (bar.quip) bar.quip.textContent = quipFor(ms, pct);
  }

  /*
   * opts:
   *   textTargets: array of elements to receive the countdown text
   *   bar:         { track, fill, rider, goal, quip } elements (optional)
   */
  function startCountdown(opts) {
    const textTargets = opts.textTargets || [];

    function tick() {
      const ms = getRemaining();
      const text = formatRemaining(ms);
      textTargets.forEach((el) => {
        if (el) el.textContent = text;
      });
      if (opts.bar) renderBar(opts.bar, ms);
    }

    tick();
    return setInterval(tick, 60 * 1000);
  }

  window.Countdown = { getRemaining, getProgress, formatRemaining, startCountdown };
})();
