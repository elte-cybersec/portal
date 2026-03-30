import type {
  ParsedPortalMetadata,
  ParsedProjectData,
  ProjectMeta,
  RepositoryPageMeta,
} from "../types";
import { parseRepositoryDocument } from "./parseRepositoryDocument";

function toTitleCaseFromSlug(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function resolveProjectSlug(
  repo: RepositoryPageMeta,
  metadata: ParsedPortalMetadata,
): string {
  return metadata.slug?.trim() || repo.fileSlug;
}

function buildProjectMeta(
  repo: RepositoryPageMeta,
  metadata: ParsedPortalMetadata,
): ProjectMeta {
  const resolvedSlug = resolveProjectSlug(repo, metadata);

  return {
    slug: resolvedSlug,
    title: metadata.title || toTitleCaseFromSlug(resolvedSlug),
    shortDescription:
      metadata.summary ||
      "This project contains repository-based documentation and related materials.",
    routePath: `/repos/${resolvedSlug}`,
    startDate: metadata.startDate,
    endDate: metadata.endDate,
    logos: metadata.logos || [],
    repositoryUrl: metadata.repositoryUrl,
  };
}

export function getParsedProjects(
  repositoryPages: RepositoryPageMeta[],
): ParsedProjectData[] {
  return repositoryPages.map((repo) => {
    const document = parseRepositoryDocument(repo.content);
    const project = buildProjectMeta(repo, document.metadata);

    return {
      repository: repo,
      project,
      document,
    };
  });
}