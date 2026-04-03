import type { PublicationItem, PublicationType } from "../data/publicationsData";

export type PublicationFilter = "all" | PublicationType;

export interface PublicationSearchOptions {
  type: PublicationFilter;
  searchText: string;
  year: string;
}

export function sortPublications(items: PublicationItem[]): PublicationItem[] {
  return [...items].sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year;
    }

    return a.title.localeCompare(b.title);
  });
}

export function filterPublications(
  items: PublicationItem[],
  filter: PublicationFilter
): PublicationItem[] {
  if (filter === "all") {
    return items;
  }

  return items.filter((item) => item.type === filter);
}

export function searchPublications(
  items: PublicationItem[],
  options: PublicationSearchOptions
): PublicationItem[] {
  const normalizedSearch = options.searchText.trim().toLowerCase();
  const normalizedYear = options.year.trim();

  return items.filter((item) => {
    const matchesType =
      options.type === "all" ? true : item.type === options.type;

    const matchesSearch =
      normalizedSearch.length === 0
        ? true
        : item.title.toLowerCase().includes(normalizedSearch);

    const matchesYear =
      normalizedYear.length === 0 ? true : String(item.year) === normalizedYear;

    return matchesType && matchesSearch && matchesYear;
  });
}