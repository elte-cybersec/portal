export interface NavigationItem {
  label: string;
  path: string;
}

export const navigationItems: NavigationItem[] = [
  { label: "Projects", path: "/projects" },
  { label: "Research", path: "/research" },
  { label: "Publications", path: "/publications" },
  { label: "Team", path: "/team" },
  { label: "Mini Apps", path: "/tools" },
];