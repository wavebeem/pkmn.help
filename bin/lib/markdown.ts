// Shared markdown-it instance for rendering standalone static pages (changelog,
// credits) from their source .md files.
import MarkdownIt from "markdown-it";

export const markdown = new MarkdownIt({
  typographer: true,
});
