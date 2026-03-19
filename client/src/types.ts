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
  label: string;
  routePath: string;
  content: string;
}