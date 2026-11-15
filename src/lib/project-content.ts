import "server-only";
import { readFile } from "fs/promises";
import path from "path";

export type ProjectItem = { title: string; body: string };
export type ProjectSection = { title: string; body: string; items: ProjectItem[] };

/** Strip stray markdown escapes/emphasis that sneak into headings (e.g. "Digital & Social Media\*\*"). */
function cleanHeading(text: string) {
  return text.replace(/\\\*/g, "").replace(/\*\*/g, "").trim();
}

/**
 * Splits a project's markdown into "## section" rows, each with an intro body
 * and optional "### item" sub-blocks, matching the Figma project-page layout.
 */
export async function getProjectSections(lang: Lang, slug: string): Promise<ProjectSection[]> {
  const file = path.join(process.cwd(), "src", "dict", "markdown", lang, `${slug}.mdx`);
  const source = (await readFile(file, "utf8")).replace(/\r\n/g, "\n");

  const sections: ProjectSection[] = [];
  let section: ProjectSection | null = null;
  let item: ProjectItem | null = null;

  for (const line of source.split("\n")) {
    const h2 = line.match(/^##\s+(.*)$/);
    const h3 = line.match(/^###\s+(.*)$/);
    if (h2) {
      section = { title: cleanHeading(h2[1]), body: "", items: [] };
      sections.push(section);
      item = null;
    } else if (h3 && section) {
      item = { title: cleanHeading(h3[1]), body: "" };
      section.items.push(item);
    } else if (item) {
      item.body += line + "\n";
    } else if (section) {
      section.body += line + "\n";
    }
  }

  return sections.map((s) => ({
    ...s,
    body: s.body.trim(),
    items: s.items.map((i) => ({ ...i, body: i.body.trim() })),
  }));
}
