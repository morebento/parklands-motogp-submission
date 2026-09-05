/*
 * mailto: link builder with the length-threshold fallback from spec 7.3.
 * mailto: links are unreliable past ~1,800-2,000 total characters in some
 * mail clients, so past that threshold we send a short placeholder body and
 * rely on "Copy submission text" instead of silently truncating.
 */
(function () {
  const SAFE_THRESHOLD = 1800;

  function buildMailto(letterText, aplaCc) {
    // Per RFC 6068, recipient addresses (before "?") are not percent-encoded —
    // only header values (subject/body/cc value) are. Encoding "to"/"cc" here
    // would turn "@" into "%40", which some mail clients mishandle.
    const to = CONTENT.meta.officialEmail;
    const subject = CONTENT.meta.subjectLine;
    const ccParam = aplaCc ? "&cc=" + CONTENT.meta.aplaCcEmail : "";

    const fullHref =
      "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(letterText) + ccParam;

    if (fullHref.length <= SAFE_THRESHOLD) {
      return { href: fullHref, truncated: false };
    }

    const placeholderBody =
      "I have copied my submission to the clipboard — please paste it here before sending.";
    const shortHref =
      "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(placeholderBody) + ccParam;

    return { href: shortHref, truncated: true };
  }

  window.MailtoBuilder = { buildMailto, SAFE_THRESHOLD };
})();
