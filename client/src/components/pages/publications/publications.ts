import type { PublicationItem } from "../../../data/publicationsData";

export type PublicationFilter = "all" | "conference" | "journal" | "book-chapter";

export interface PublicationSearchOptions {
  type: PublicationFilter;
  searchText: string;
  year: string;
  tags: string[];
  author: string | null;
}

export function sortPublications(items: PublicationItem[]): PublicationItem[] {
  return [...items].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return a.title.localeCompare(b.title);
  });
}

export function searchPublications(
  items: PublicationItem[],
  options: PublicationSearchOptions
): PublicationItem[] {
  const { type, searchText, year, tags, author } = options;
  const normalizedSearch = searchText.trim().toLowerCase();
  const normalizedYear = year.trim();

  return items.filter((item) => {
    if (type !== "all" && item.type !== type) return false;

    if (normalizedSearch && !item.title.toLowerCase().includes(normalizedSearch)) {
      return false;
    }

    if (normalizedYear && String(item.year) !== normalizedYear) {
      return false;
    }

    if (tags.length > 0) {
      const itemTagsLower = item.tags.map((t) => t.toLowerCase());
      const allTagsMatch = tags.every((t) =>
        itemTagsLower.includes(t.toLowerCase())
      );
      if (!allTagsMatch) return false;
    }

    if (author) {
      if (!item.authors.includes(author)) return false;
    }

    return true;
  });
}

export function getUniqueAuthors(items: PublicationItem[]): string[] {
  const set = new Set<string>();
  items.forEach((item) => item.authors.forEach((a) => set.add(a)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}