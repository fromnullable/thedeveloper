import Badge from "react-bootstrap/Badge";
import { jsonToMarkdown } from "../utils/jsonToMarkdown";
import { downloadTextFile } from "../utils/downloadTextFile";
import { jsonToPdf } from "../utils/jsonToPdf"; // ATS
import { jsonToPdfHuman } from "../utils/jsonToPdfHuman"; // Human

export default function ExportBadges({ data }) {
  const handleMd = () => {
    const md = jsonToMarkdown(data);
    downloadTextFile({
      filename: "Israel-Perez.md",
      content: md,
      mime: "text/markdown",
    });
  };

  const handleJson = () => {
    downloadTextFile({
      filename: "Isarel-Perez.json",
      content: JSON.stringify(data, null, 2),
      mime: "application/json",
    });
  };

  const handlePdfHuman = () => {
    const doc = jsonToPdfHuman(data);
    doc.save("Israel-Perez.pdf");
  };

  const handlePdfAts = () => {
    const doc = jsonToPdf(data);
    doc.save("Israel-Perez-ATS.pdf");
  };

  return (
    <div className="d-flex justify-content-left my-3 display-4 gap-3 flex-wrap align-items-center">
      {/* Markdown */}
      <Badge
        bg="dark"
        role="button"
        tabIndex={0}
        className="cursor-pointer"
        title="Download Markdown"
        aria-label="Download Markdown"
        onClick={handleMd}
        onKeyDown={(e) => e.key === "Enter" && handleMd()}
      >
        <i className="bi bi-markdown" />
      </Badge>

      {/* JSON */}
      <Badge
        bg="dark"
        role="button"
        tabIndex={0}
        className="cursor-pointer"
        title="Download JSON"
        aria-label="Download JSON"
        onClick={handleJson}
        onKeyDown={(e) => e.key === "Enter" && handleJson()}
      >
        <i className="bi bi-filetype-json" />
      </Badge>

      {/* PDF (Human) */}
      <Badge
        bg="dark"
        role="button"
        tabIndex={0}
        className="cursor-pointer"
        title="Download PDF (Human)"
        aria-label="Download PDF Human"
        onClick={handlePdfHuman}
        onKeyDown={(e) => e.key === "Enter" && handlePdfHuman()}
      >
        <i className="bi bi-filetype-pdf" />
        <span className="ms-2 fs-6 align-middle">PDF</span>
      </Badge>

      {/* PDF (ATS) */}
      <Badge
        bg="secondary"
        role="button"
        tabIndex={0}
        className="cursor-pointer"
        title="Download PDF (ATS)"
        aria-label="Download PDF ATS"
        onClick={handlePdfAts}
        onKeyDown={(e) => e.key === "Enter" && handlePdfAts()}
      >
        <i className="bi bi-filetype-pdf" />
        <span className="ms-2 fs-6 align-middle">ATS</span>
      </Badge>
    </div>
  );
}
