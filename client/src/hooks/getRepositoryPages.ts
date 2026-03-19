import type { RepositoryPageMeta } from "../types";

function toTitleCaseFromSlug(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getRepositoryPages(): RepositoryPageMeta[] {
  const modules = import.meta.glob("../content/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }) as Record<string, string>;

  return Object.entries(modules).map(([filePath, content]) => {
    const fileName = filePath.split("/").pop() ?? "";
    const slug = fileName.replace(/\.md$/i, "");

    return {
      fileName,
      slug,
      label: toTitleCaseFromSlug(slug),
      routePath: `/repos/${slug}`,
      content,
    };
  });
}