export interface AboutPerson {
  title: string;
  name: string;
  familyName: string;
  job: string;
  extraInfo: string;
  picture?: string;
  link?: string;
}

export interface ContactPageData {
  email?: string;
  phone?: string;
  showForm?: boolean;
}

export interface RepositoryPageMeta {
  fileName: string;
  fileSlug: string;
  content: string;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  shortDescription: string;
  routePath: string;
  startDate?: string;
  endDate?: string;
  logos?: string[];
  repositoryUrl?: string;
}

export interface ParsedPortalMetadata {
  slug?: string;
  title?: string;
  summary?: string;
  startDate?: string;
  endDate?: string;
  logos?: string[];
  repositoryUrl?: string;
}

export interface ParsedRepositoryChildSection {
  id: string;
  title: string;
  content: string;
}

export interface ParsedRepositorySection {
  id: string;
  title: string;
  content: string;
  children: ParsedRepositoryChildSection[];
}

export interface ParsedRepositoryDocument {
  metadata: ParsedPortalMetadata;
  sections: ParsedRepositorySection[];
}

export interface ParsedProjectData {
  repository: RepositoryPageMeta;
  project: ProjectMeta;
  document: ParsedRepositoryDocument;
}