/*
 * Client-side PDF export via jsPDF (spec 7.4). Plain, formal layout with no
 * site branding — meant to read like an ordinary personal letter when
 * attached to the survey or an email.
 */
(function () {
  function todayFormatted() {
    return new Date().toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function downloadPdf(letterText, filenameHint) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    const marginLeft = 56;
    const marginTop = 64;
    const lineHeight = 16;
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const wrapWidth = pageWidth - marginLeft * 2;

    doc.setFont("times", "normal");
    doc.setFontSize(11);

    let y = marginTop;
    doc.text(todayFormatted(), marginLeft, y);
    y += lineHeight * 2;

    const lines = letterText.split("\n");
    lines.forEach((line) => {
      if (line === "") {
        y += lineHeight;
      } else {
        const wrapped = doc.splitTextToSize(line, wrapWidth);
        wrapped.forEach((wrappedLine) => {
          if (y > pageHeight - marginTop) {
            doc.addPage();
            y = marginTop;
          }
          doc.text(wrappedLine, marginLeft, y);
          y += lineHeight;
        });
      }
    });

    const filename = (filenameHint || "motogp-submission").replace(/[^a-z0-9-]+/gi, "-").toLowerCase() + ".pdf";
    doc.save(filename);
  }

  window.PdfExport = { downloadPdf };
})();
