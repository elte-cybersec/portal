import type {
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

function buildProjectMeta(
  repo: RepositoryPageMeta,
  metadata: {
    title?: string;
    summary?: string;
    startDate?: string;
    endDate?: string;
    logos?: string[];
    repositoryUrl?: string;
  },
): ProjectMeta {
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

export function getProjects(
  repositoryPages: RepositoryPageMeta[],
): ProjectMeta[] {
  return getParsedProjects(repositoryPages).map((item) => item.project);
}