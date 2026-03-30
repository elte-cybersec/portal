import type {
  ParsedPortalMetadata,
  ParsedRepositoryChildSection,
  ParsedRepositoryDocument,
  ParsedRepositorySection,
} from "../types";

function slugifyHeading(title: string): string {
  return title
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function parsePortalMetadataBlock(lines: string[]): ParsedPortalMetadata {
  const metadata: ParsedPortalMetadata = {};
  const logos: string[] = [];

  let insideLogos = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();

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
        metadata.slug = value || undefined;
        break;
      case "title":
        metadata.title = value || undefined;
        break;
      case "summary":
        metadata.summary = value || undefined;
        break;
      case "startDate":
        metadata.startDate = value || undefined;
        break;
      case "endDate":
        metadata.endDate = value || undefined;
        break;
      case "repositoryUrl":
        metadata.repositoryUrl = value || undefined;
        break;
      default:
        break;
    }
  }

  metadata.logos = logos;
  return metadata;
}

function isFenceLine(line: string): boolean {
  return /^(```|~~~)/.test(line.trim());
}

export function parseRepositoryDocument(
  content: string,
): ParsedRepositoryDocument {
  const lines = content.split("\n");

  const sections: ParsedRepositorySection[] = [];
  let metadata: ParsedPortalMetadata = {};

  let currentSection: ParsedRepositorySection | null = null;
  let currentChild: ParsedRepositoryChildSection | null = null;

  let sectionBuffer: string[] = [];
  let childBuffer: string[] = [];

  let insideTableOfContents = false;
  let insideMetadata = false;
  let insidePortalBlock = false;
  let insideCodeFence = false;

  const portalBlockLines: string[] = [];

  function flushChild() {
    if (!currentChild) {
      return;
    }

    currentChild.content = childBuffer.join("\n").trim();
    childBuffer = [];
    currentChild = null;
  }

  function flushSection() {
    flushChild();

    if (!currentSection) {
      return;
    }

    currentSection.content = sectionBuffer.join("\n").trim();
    sectionBuffer = [];
    sections.push(currentSection);
    currentSection = null;
  }

  function startNewSection(title: string) {
    flushSection();

    currentSection = {
      id: slugifyHeading(title),
      title,
      content: "",
      children: [],
    };
  }

  function startNewChild(title: string) {
    if (!currentSection) {
      return;
    }

    flushChild();

    currentChild = {
      id: slugifyHeading(title),
      title,
      content: "",
    };

    currentSection.children.push(currentChild);
  }

  function pushContentLine(line: string) {
    if (currentChild) {
      childBuffer.push(line);
      return;
    }

    if (currentSection) {
      sectionBuffer.push(line);
    }
  }

  for (const rawLine of lines) {
    const trimmedLine = rawLine.trim();

    try {
      if (insideMetadata) {
        if (!insidePortalBlock) {
          if (trimmedLine.startsWith("```portal")) {
            insidePortalBlock = true;
          }
          continue;
        }

        if (trimmedLine === "```") {
          metadata = parsePortalMetadataBlock(portalBlockLines);
          insidePortalBlock = false;
          insideMetadata = false;
          continue;
        }

        portalBlockLines.push(rawLine);
        continue;
      }

      if (trimmedLine === "## PORTAL_METADATA") {
        flushSection();
        insideTableOfContents = false;
        insideMetadata = true;
        continue;
      }

      if (isFenceLine(rawLine)) {
        insideCodeFence = !insideCodeFence;

        if (!insideTableOfContents) {
          pushContentLine(rawLine);
        }

        continue;
      }

      if (insideCodeFence) {
        if (!insideTableOfContents) {
          pushContentLine(rawLine);
        }
        continue;
      }

      const headingMatch = rawLine.match(/^(#{1,3})\s+(.*)$/);

      if (headingMatch) {
        const level = headingMatch[1].length;
        const title = headingMatch[2].trim();

        if (level === 2 && /table of contents/i.test(title)) {
          flushSection();
          insideTableOfContents = true;
          continue;
        }

        if (insideTableOfContents) {
          if (level === 2) {
            insideTableOfContents = false;
          } else {
            continue;
          }
        }

        if (level === 1) {
          continue;
        }

        if (level === 2) {
          startNewSection(title);
          continue;
        }

        if (level === 3) {
          startNewChild(title);
          continue;
        }
      }

      if (insideTableOfContents) {
        continue;
      }

      pushContentLine(rawLine);
    } catch {
      if (currentChild) {
        childBuffer.push(
          "\\n[data structure warning: this subsection could not be parsed cleanly]\\n",
        );
      } else if (currentSection) {
        sectionBuffer.push(
          "\\n[data structure warning: this section could not be parsed cleanly]\\n",
        );
      }
    }
  }

  flushSection();

  return {
    metadata,
    sections,
  };
}