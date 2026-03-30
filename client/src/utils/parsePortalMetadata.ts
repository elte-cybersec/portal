export interface ParsedPortalMetadata {
  slug?: string;
  title?: string;
  summary?: string;
  startDate?: string;
  endDate?: string;
  logos?: string[];
}

export function parsePortalMetadata(content: string): ParsedPortalMetadata {
  const portalBlockMatch = content.match(/```portal\s*([\s\S]*?)```/);

  if (!portalBlockMatch) {
    return {};
  }

  const block = portalBlockMatch[1];
  const lines = block.split("\n").map((line) => line.trim());

  const metadata: ParsedPortalMetadata = {};
  const logos: string[] = [];

  let insideLogos = false;

  for (const line of lines) {
    if (!line) {
      continue;
    }

    if (line.startsWith("logos:")) {
      insideLogos = true;
      continue;
    }

    if (insideLogos && line.startsWith("-")) {
      logos.push(line.replace(/^-+\s*/, "").trim());
      continue;
    }

    if (insideLogos && !line.startsWith("-")) {
      insideLogos = false;
    }

    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    switch (key) {
      case "slug":
        metadata.slug = value;
        break;
      case "title":
        metadata.title = value;
        break;
      case "summary":
        metadata.summary = value;
        break;
      case "startDate":
        metadata.startDate = value || undefined;
        break;
      case "endDate":
        metadata.endDate = value || undefined;
        break;
      default:
        break;
    }
  }

  metadata.logos = logos;

  return metadata;
}