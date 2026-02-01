import jsPDF from "jspdf";

function wrap(doc, text, maxWidth) {
  return doc.splitTextToSize(text ?? "—", maxWidth);
}

function formatRange(dates) {
  if (!dates) return "";
  const s = dates.start ?? "";
  const e = dates.end ?? "";
  if (s && e) return `${s} – ${e}`;
  return s || e || "";
}

export function jsonToPdf(resume) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 48;
  const maxWidth = pageWidth - margin * 2;

  let y = margin;

  const line = (h = 14) => (y += h);

  /* ========= HEADER ========= */

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(resume?.basics?.name ?? "—", margin, y);
  line(20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  const contact = [
    resume?.basics?.location,
    resume?.basics?.phone,
    resume?.basics?.email,
  ].filter(Boolean).join(" • ");
  doc.text(contact || "—", margin, y);
  line(18);

  /* ========= SECTION HELPER ========= */

  const section = (title) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(title.toUpperCase(), margin, y);
    line(10);
  };

  const paragraph = (text) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const lines = wrap(doc, text, maxWidth);
    doc.text(lines, margin, y);
    line(lines.length * 13);
  };

  const checkPage = () => {
    if (y > pageHeight - 80) {
      doc.addPage();
      y = margin;
    }
  };

  /* ========= SUMMARY ========= */

  section("Summary");
  paragraph(resume?.summary);

  line(6);

  /* ========= EXPERIENCE ========= */

  section("Professional Experience");

  (resume?.experience ?? []).forEach((job) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);

    const header = `${job.title ?? "—"} — ${job.company ?? "—"}`;
    const headerLines = wrap(doc, header, maxWidth);
    doc.text(headerLines, margin, y);
    line(headerLines.length * 13);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const meta = `${job.location ?? "—"}${formatRange(job.dates) ? ` • ${formatRange(job.dates)}` : ""}`;
    doc.text(meta, margin, y);
    line(12);

    const bullets = job.highlights?.length ? job.highlights : ["—"];
    bullets.forEach((b) => {
      const bulletLines = wrap(doc, `• ${b}`, maxWidth - 12);
      doc.text(bulletLines, margin + 12, y);
      line(bulletLines.length * 12);
      checkPage();
    });

    line(6);
  });

  /* ========= EDUCATION ========= */

  section("Education");

  (resume?.education ?? []).forEach((e) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(e.degree ?? "—", margin, y);
    line(12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text(`${e.school ?? "—"}${e.year ? ` (${e.year})` : ""}`, margin, y);
    line(14);
  });

  line(4);

  /* ========= TECHNICAL SKILLS ========= */

  section("Technical Skills");

  const skillsLine = (resume?.technicalSkills ?? [])
    .map((g) => (g.items ?? []).join(", "))
    .join("; ");

  paragraph(skillsLine || "—");

  return doc;
}
