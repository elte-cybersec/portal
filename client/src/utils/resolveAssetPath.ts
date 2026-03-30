const DEFAULT_PREFIX = import.meta.env.BASE_URL;

export function resolveAssetPath(path?: string | null): string {
  if (!path) {
    return DEFAULT_PREFIX;
  }

  if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return `${DEFAULT_PREFIX}${normalizedPath}`;
}