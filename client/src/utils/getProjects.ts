import type { ProjectMeta, RepositoryPageMeta } from "../types";
import { parsePortalMetadata } from "../utils/parsePortalMetadata";

function toTitleCaseFromSlug(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getProjects(
  repositoryPages: RepositoryPageMeta[],
): ProjectMeta[] {
  return repositoryPages.map((repo) => {
    const metadata = parsePortalMetadata(repo.content);

    return {
      slug: repo.slug,
      title: metadata.title || toTitleCaseFromSlug(repo.slug),
      shortDescription:
        metadata.summary ||
        "This project contains repository-based documentation and related materials.",
      routePath: `/repos/${repo.slug}`,
      startDate: metadata.startDate,
      endDate: metadata.endDate,
      logos: metadata.logos || [],
    };
  });
}