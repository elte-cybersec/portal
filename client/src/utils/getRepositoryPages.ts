import type { RepositoryPageMeta } from "../types";

export function getRepositoryPages(): RepositoryPageMeta[] {
  const modules = import.meta.glob("../content/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }) as Record<string, string>;

  return Object.entries(modules).map(([filePath, content]) => {
    const fileName = filePath.split("/").pop() ?? "";
    const fileSlug = fileName.replace(/\.md$/i, "");

    return {
      fileName,
      fileSlug,
      content,
    };
  });
}