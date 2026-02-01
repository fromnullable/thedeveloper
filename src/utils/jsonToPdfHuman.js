// pdfResume.js
import jsPDF from "jspdf";

/* =========================
   COLOR THEME (tweak these)
========================= */
const COLORS = {
  ink: [17, 24, 39],        // near-black
  muted: [75, 85, 99],      // slate
  rule: [229, 231, 235],    // light gray
  accent: [15, 118, 110],   // teal
  accentSoft: [204, 251, 241], // very light teal
};

/* =========================
   TEXT + DATE HELPERS
========================= */
function wrap(doc, text, maxWidth) {
  return doc.splitTextToSize((text ?? "—").toString(), maxWidth);
}

function formatMonth(yyyyMm) {
  if (!yyyyMm || typeof yyyyMm !== "string") return "";
  const [y, m] = yyyyMm.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const idx = Number(m) - 1;
  if (!y || idx < 0 || idx > 11) return yyyyMm;
  return `${months[idx]} ${y}`;
}

function formatRange(dates) {
  if (!dates) return "";
  const s = formatMonth(dates.start ?? "");
  const e = formatMonth(dates.end ?? "");
  if (s && e) return `${s} – ${e}`;
  return s || e || "";
}

/* =========================
   OPTIONAL: FRIENDLY FONT (Inter/Nunito/etc)
   Put fonts in /public/fonts (or your static folder):
   - /fonts/Inter-Regular.ttf
   - /fonts/Inter-SemiBold.ttf

   Use jsonToPdfHumanAsync() if you want custom fonts.
========================= */
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function loadFontFromUrl(doc, { url, vfsName, fontName, fontStyle }) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load font: ${url}`);
  const buf = await res.arrayBuffer();
  const b64 = arrayBufferToBase64(buf);

  doc.addFileToVFS(vfsName, b64);
  doc.addFont(vfsName, fontName, fontStyle);
}

/* =========================
   CORE RENDERER (shared)
========================= */
function renderResumeToDoc(doc, resume, { fontFamily = "helvetica" } = {}) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const marginX = 54;
  const marginTop = 54;
  const marginBottom = 54;

  const maxWidth = pageWidth - marginX * 2;
  const rightEdge = pageWidth - marginX;

  let y = marginTop;

  const setColor = (rgb) => doc.setTextColor(...rgb);
  const setDraw = (rgb) => doc.setDrawColor(...rgb);
  const setFill = (rgb) => doc.setFillColor(...rgb);

  const setInk = () => setColor(COLORS.ink);
  const setMuted = () => setColor(COLORS.muted);

  const drawRule = (yPos, w = 0.6) => {
    setDraw(COLORS.rule);
    doc.setLineWidth(w);
    doc.line(marginX, yPos, rightEdge, yPos);
  };

  const checkPage = (needed = 0) => {
    if (y + needed > pageHeight - marginBottom) {
      doc.addPage();
      y = marginTop;
      // subtle top rule on new pages
      drawRule(y - 18, 0.8);
    }
  };

  const checkPageAt = (cursorY, needed = 0) => {
    if (cursorY + needed > pageHeight - marginBottom) {
      doc.addPage();
      const newY = marginTop;
      drawRule(newY - 18, 0.8);
      return newY;
    }
    return cursorY;
  };

  const sectionTitle = (title) => {
    checkPage(60);

    setColor(COLORS.accent);
    doc.setFont(fontFamily, "bold");
    doc.setFontSize(10.75);
    doc.text(title.toUpperCase(), marginX, y);

    y += 8;
    setDraw(COLORS.accent);
    doc.setLineWidth(0.8);
    doc.line(marginX, y, rightEdge, y);

    y += 16;
  };

  const paragraph = (text, fontSize = 10.75, leading = 15) => {
    doc.setFont(fontFamily, "normal");
    doc.setFontSize(fontSize);

    const lines = wrap(doc, text, maxWidth);
    checkPage(lines.length * leading + 12);

    setInk();
    doc.text(lines, marginX, y);
    y += lines.length * leading + 6;
  };

  const bullets = (items, { fontSize = 10.5, leading = 13.5, indent = 14 } = {}) => {
    const list = items?.length ? items : ["—"];

    doc.setFont(fontFamily, "normal");
    doc.setFontSize(fontSize);
    setInk();

    list.forEach((b) => {
      const lines = wrap(doc, `• ${b}`, maxWidth - indent);
      checkPage(lines.length * leading + 10);
      doc.text(lines, marginX + indent, y);
      y += lines.length * leading + 2;
    });

    y += 6;
  };

  /* =========================
     HEADER (more color)
  ========================= */
  const basics = resume?.basics ?? {};
  const name = basics.name ?? "—";
  const contact = [basics.location, basics.phone, basics.email, basics.website].filter(Boolean);

  // Accent bar at top
  setFill(COLORS.accent);
  doc.rect(0, 0, pageWidth, 6, "F");

  // Name
  setInk();
  doc.setFont(fontFamily, "bold");
  doc.setFontSize(24);
  doc.text(name, marginX, y);
  y += 18;

  // Contact
  setMuted();
  doc.setFont(fontFamily, "normal");
  doc.setFontSize(10.75);
  doc.text(contact.length ? contact.join(" • ") : "—", marginX, y);
  y += 14;

  // Accent divider
  setDraw(COLORS.accent);
  doc.setLineWidth(1.2);
  doc.line(marginX, y, rightEdge, y);
  y += 18;

  /* =========================
     SUMMARY
  ========================= */
  sectionTitle("Summary");
  paragraph(resume?.summary ?? "—", 10.75, 15);

  /* =========================
     EXPERIENCE
  ========================= */
  sectionTitle("Professional Experience");

  const exp = resume?.experience ?? [];
  exp.forEach((job) => {
    checkPage(120);

    const title = job?.title ?? "—";
    const company = job?.company ?? "—";
    const location = job?.location ?? "—";
    const range = formatRange(job?.dates);
    const meta = `${location}${range ? `  •  ${range}` : ""}`;

    // Job header
    setInk();
    doc.setFont(fontFamily, "bold");
    doc.setFontSize(11.5);
    const headerLines = wrap(doc, `${title} — ${company}`, maxWidth);
    checkPage(headerLines.length * 14 + 28);
    doc.text(headerLines, marginX, y);
    y += headerLines.length * 14;

    // Meta
    setMuted();
    doc.setFont(fontFamily, "normal");
    doc.setFontSize(10.25);
    doc.text(wrap(doc, meta, maxWidth), marginX, y);
    y += 14;

    // Optional summary
    if (job?.summary) {
      doc.setFont(fontFamily, "normal");
      doc.setFontSize(10.5);
      const sumLines = wrap(doc, job.summary, maxWidth);
      checkPage(sumLines.length * 13.5 + 12);
      setInk();
      doc.text(sumLines, marginX, y);
      y += sumLines.length * 13.5 + 6;
    }

    // Highlights
    bullets(job?.highlights ?? [], { fontSize: 10.5, leading: 13.5, indent: 12 });

    // Separator (light)
    setDraw(COLORS.rule);
    doc.setLineWidth(0.6);
    doc.line(marginX, y - 2, rightEdge, y - 2);
    y += 12;
  });

  /* =========================
     EDUCATION
  ========================= */
  sectionTitle("Education");

  const edu = resume?.education ?? [];
  if (!edu.length) {
    paragraph("—", 10.75, 15);
  } else {
    edu.forEach((e) => {
      checkPage(48);

      setInk();
      doc.setFont(fontFamily, "bold");
      doc.setFontSize(10.75);
      doc.text(e.degree ?? "—", marginX, y);
      y += 13;

      setMuted();
      doc.setFont(fontFamily, "normal");
      doc.setFontSize(10.25);
      doc.text(`${e.school ?? "—"}${e.year ? `  (${e.year})` : ""}`, marginX, y);
      y += 16;
    });
    y += 4;
  }

  /* =========================
     TECHNICAL SKILLS (2-column, page-safe)
  ========================= */
  sectionTitle("Technical Skills");

  const techGroups = resume?.technicalSkills ?? [];
  if (!techGroups.length) {
    paragraph("—", 10.75, 15);
  } else {
    const gap = 18;
    const colWidth = (maxWidth - gap) / 2;
    const leftX = marginX;
    const rightX = marginX + colWidth + gap;

    let leftY = y;
    let rightY = y;

    const measureGroupHeight = (group) => {
      // heading + spacing
      let h = 12 + 10;

      doc.setFont(fontFamily, "normal");
      doc.setFontSize(10.25);
      const items = (group.items ?? []).join(", ") || "—";
      const lines = wrap(doc, items, colWidth);
      h += lines.length * 13;

      // bottom padding
      h += 12;
      return h;
    };

    const writeGroup = (x, startY, group) => {
      // Area title in accent (friendly pop)
      setColor(COLORS.accent);
      doc.setFont(fontFamily, "bold");
      doc.setFontSize(10.5);
      doc.text(group.area ?? "—", x, startY);

      let yy = startY + 12;

      setInk();
      doc.setFont(fontFamily, "normal");
      doc.setFontSize(10.25);
      const items = (group.items ?? []).join(", ") || "—";
      const lines = wrap(doc, items, colWidth);
      doc.text(lines, x, yy);

      yy += lines.length * 13 + 10;
      return yy;
    };

    techGroups.forEach((g) => {
      const h = measureGroupHeight(g);
      const chooseRight = rightY < leftY;

      if (chooseRight) {
        rightY = checkPageAt(rightY, h);
        if (rightY === marginTop) leftY = marginTop;
        rightY = writeGroup(rightX, rightY, g);
      } else {
        leftY = checkPageAt(leftY, h);
        if (leftY === marginTop) rightY = marginTop;
        leftY = writeGroup(leftX, leftY, g);
      }
    });

    y = Math.max(leftY, rightY) + 6;
  }

  return doc;
}

/* =========================
   EXPORT 1: SIMPLE (color + built-in fonts)
   Friendly look via spacing + accent colors
========================= */
export function jsonToPdfHuman(resume) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  // built-in fonts only: helvetica/times/courier
  renderResumeToDoc(doc, resume, { fontFamily: "helvetica" });
  return doc;
}

/* =========================
   EXPORT 2: FRIENDLIER CUSTOM FONT (Inter)
   Uses fetch() to load fonts from /public/fonts
========================= */
export async function jsonToPdfHumanAsync(resume) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });

  // Load Inter (change URLs/font names if you want Nunito, Source Sans, etc.)
  await loadFontFromUrl(doc, {
    url: "/fonts/Inter-Regular.ttf",
    vfsName: "Inter-Regular.ttf",
    fontName: "Inter",
    fontStyle: "normal",
  });

  await loadFontFromUrl(doc, {
    url: "/fonts/Inter-SemiBold.ttf",
    vfsName: "Inter-SemiBold.ttf",
    fontName: "Inter",
    fontStyle: "bold",
  });

  renderResumeToDoc(doc, resume, { fontFamily: "Inter" });
  return doc;
}
