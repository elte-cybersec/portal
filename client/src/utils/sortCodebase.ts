import type { CodebaseMeta } from "../types";

export type CodebaseSortMode =
  | "title-asc"
  | "title-desc"
  | "startDate-newest"
  | "startDate-oldest";

function toSortableTime(date?: string): number {
  if (!date) return 0;

  const time = new Date(date).getTime();
  return Number.isNaN(time) ? 0 : time;
}

export function sortCodebase(
  codes: CodebaseMeta[],
  mode: CodebaseSortMode = "title-asc",
): CodebaseMeta[] {
  const sorted = [...codes];

  switch (mode) {
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

    case "startDate-newest":
      return sorted.sort((a, b) => {
        const aTime = toSortableTime(a.startDate);
        const bTime = toSortableTime(b.startDate);

        if (aTime !== bTime) {
          return bTime - aTime;
        }

        return a.title.localeCompare(b.title);
      });

    case "startDate-oldest":
      return sorted.sort((a, b) => {
        const aTime = toSortableTime(a.startDate);
        const bTime = toSortableTime(b.startDate);

        if (aTime !== bTime) {
          return aTime - bTime;
        }

        return a.title.localeCompare(b.title);
      });

    case "title-asc":
    default:
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }
}