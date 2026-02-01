import { createHighlighter } from "shiki";

let highlighter;

export async function getShiki() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["nord", "github-dark"],
      langs: ["js", "jsx", "ts", "json", "bash"]
    });
  }
  return highlighter;
}
