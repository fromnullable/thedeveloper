import { useEffect, useState } from "react";
import { getShiki } from "../utils/shiki";

export default function CodeSnippet({ code, lang = "js", theme = "nord" }) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    let mounted = true;

    getShiki().then((highlighter) => {
      const result = highlighter.codeToHtml(code, {
        lang,
        theme,
      });
      if (mounted) setHtml(result);
    });

    return () => (mounted = false);
  }, [code, lang, theme]);

  async function copyCode(e) {
    const btn = e.currentTarget;
    const icon = btn.querySelector("i");

    const temp = document.createElement("div");
    temp.innerHTML = html;
    const text = temp.innerText;
    await navigator.clipboard.writeText(text).then(() => {
      icon.className = "bi bi-check2";

      setTimeout(() => {
        icon.className = "bi bi-clipboard";
      }, 1200);
    }).catch(()=>{

         alert("something went wrong");
    });
  }

  return (
    <div className="code-snippet-wrapper position-relative ">
      <button
        className="copy-btn btn btn-dark position-absolute top-50 end-0 translate-middle-y me-1"
        onClick={copyCode}
        title="Copy code"
      >
        <i className="bi bi-clipboard"></i>
      </button>

      <div
        className="code-snippet mb-3"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
