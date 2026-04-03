export interface NavigationItem {
  label: string;
  path: string;
}

export const navigationItems: NavigationItem[] = [
  { label: "Projects", path: "/projects" },
  { label: "Contributors", path: "/about" },
  { label: "Publications", path: "/publications" },
  { label: "Tools", path: "/tools" },
];