/*
 * Pure function: state -> assembled letter text, per spec section 6.8.
 * No DOM access, no side effects — safe to call on every state change.
 */
(function () {
  function joinWithAnd(parts) {
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return parts[0] + " and " + parts[1];
    return parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1];
  }

  function joinClauses(clauses) {
    if (clauses.length === 0) return "";
    if (clauses.length === 1) return clauses[0];
    if (clauses.length === 2) return clauses[0] + "; and " + clauses[1];
    return clauses.slice(0, -1).join("; ") + "; and " + clauses[clauses.length - 1];
  }

  function buildPersonalParagraph(state) {
    const chipFragments = CONTENT.connectionChips
      .filter((c) => state.connectionChips.includes(c.id))
      .map((c) => c.fragment);
    const freeText = state.connectionText.trim();

    if (chipFragments.length === 0 && !freeText) return "";

    let sentence = "";
    if (chipFragments.length > 0) {
      sentence = "I am writing as " + joinWithAnd(chipFragments) + ".";
    }
    if (freeText) {
      sentence = sentence ? sentence + " " + freeText : freeText;
    }
    return sentence;
  }

  function buildConcernSections(state) {
    const sections = [];
    CONTENT.categories.forEach((category) => {
      const paragraphs = category.items
        .filter((item) => state.concernIds.includes(item.id))
        .map((item) => item.paragraph);
      if (paragraphs.length > 0) {
        sections.push({ heading: category.heading, paragraphs });
      }
    });
    return sections;
  }

  function buildClosingParagraph(state) {
    const clauses = CONTENT.asks
      .filter((ask) => state.askIds.includes(ask.id))
      .map((ask) => ask.paragraph);
    if (clauses.length === 0) return "";
    return "In light of the above, I am asking the South Australian Government to " + joinClauses(clauses) + ".";
  }

  function buildSignOff(state) {
    const p = state.particulars;
    const lines = ["Yours sincerely,"];
    if (p.name.trim()) lines.push(p.name.trim());
    if (p.streetAddress.trim()) lines.push(p.streetAddress.trim());
    const suburbPostcode = [p.suburb.trim(), p.postcode.trim()].filter(Boolean).join(" ");
    if (suburbPostcode) lines.push(suburbPostcode);
    return lines.join("\n");
  }

  function buildLetter(state) {
    const parts = [];

    parts.push("To the Department for Infrastructure and Transport,");
    parts.push("");
    parts.push("Subject: " + CONTENT.meta.subjectLine);
    parts.push("");
    parts.push(
      "I am writing to make a submission on the proposed MotoGP circuit redevelopment in Victoria Park/Pakapakanthi, as part of the public consultation closing " +
        CONTENT.meta.deadlineDisplayLong +
        "."
    );

    const personal = buildPersonalParagraph(state);
    if (personal) {
      parts.push("");
      parts.push(personal);
    }

    const sections = buildConcernSections(state);
    sections.forEach((section) => {
      parts.push("");
      parts.push(section.heading);
      parts.push(section.paragraphs.join("\n\n"));
    });

    const closing = buildClosingParagraph(state);
    if (closing) {
      parts.push("");
      parts.push(closing);
    }

    parts.push("");
    parts.push(buildSignOff(state));

    return parts.join("\n");
  }

  window.Letter = { buildLetter };
})();
