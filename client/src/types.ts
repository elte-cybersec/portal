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
  slug: string;
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
}

export interface ProjectPageData {
  repository: RepositoryPageMeta;
  project: ProjectMeta;
}