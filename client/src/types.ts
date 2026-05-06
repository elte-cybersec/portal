export interface TeamMember {
  title?: string;
  name: string;
  familyName: string;
  role: string;
  extraInfo?: string;
  picture?: string;
  link?: string;
}

export interface TeamCategory {
  category: string;
  members: TeamMember[];
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

export interface CodebaseMeta {
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
  project: CodebaseMeta;
  document: ParsedRepositoryDocument;
}

export interface ProjectCodebaseRef {
  slug: string;
  title: string;
}

export interface ProjectSubProject {
  title: string;
  description: string;
  researchFocus: string[];
  codebases?: string[];
}
 
export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  mainObjectives: string[];
  subProjects: ProjectSubProject[];
  relatedProjects?: string[];
  figures?: string[];
}
 
export interface ProjectsPageData {
  projects: ProjectData[];
}
 