import { Box, Button, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/github-dark.css";

import type { ParsedRepositorySection, ProjectMeta } from "../../types";

interface RepoPageProps {
  project: ProjectMeta;
  currentSection: ParsedRepositorySection;
  sections: ParsedRepositorySection[];
}

function buildSectionMarkdown(section: ParsedRepositorySection): string {
  const parts: string[] = [];

  parts.push(`# ${section.title}`);

  if (section.content.trim()) {
    parts.push(section.content.trim());
  }

  for (const child of section.children) {
    parts.push(`## ${child.title}`);

    if (child.content.trim()) {
      parts.push(child.content.trim());
    }
  }

  return parts.join("\n\n");
}

export default function RepoPage({
  project,
  currentSection,
  sections,
}: RepoPageProps) {
  const markdownContent = buildSectionMarkdown(currentSection);

  const currentIndex = sections.findIndex(
    (section) => section.id === currentSection.id,
  );

  const previousSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection =
    currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  return (
    <Container
      maxWidth={false}
      sx={{
        py: 3,
        px: { xs: 0, md: 1 },
      }}
    >
      <Box
        className="markdown-body"
        sx={(theme) => ({
          backgroundColor: "transparent !important",
          color: `${theme.palette.text.primary} !important`,
          fontFamily: theme.typography.fontFamily,

          "&, & p, & li, & ul, & ol, & blockquote": {
            color: `${theme.palette.text.primary} !important`,
          },

          "& h1, & h2, & h3, & h4, & h5, & h6": {
            color: `${theme.palette.text.primary} !important`,
            borderColor: `${theme.palette.divider} !important`,
          },

          "& a": {
            color: `${theme.palette.primary.main} !important`,
          },

          "& hr": {
            borderColor: `${theme.palette.divider} !important`,
          },

          "& table": {
            display: "table",
            width: "100%",
            backgroundColor: "transparent !important",
          },

          "& th, & td": {
            borderColor: `${theme.palette.divider} !important`,
          },

          "& tr": {
            backgroundColor: "transparent !important",
            borderTopColor: `${theme.palette.divider} !important`,
          },

          "& blockquote": {
            borderLeftColor: `${theme.palette.divider} !important`,
          },

          "& :not(pre) > code": {
            color:
              theme.palette.mode === "light"
                ? theme.palette.text.primary
                : theme.palette.warning.light,
            backgroundColor:
              theme.palette.mode === "light"
                ? "rgba(0,0,0,0.06)"
                : "rgba(255,255,255,0.08)",
            borderRadius: "6px",
            padding: "0.15em 0.4em",
            fontVariantLigatures: "none",
          },

          "& pre": {
            backgroundColor: "#0d1117 !important",
            borderRadius: 2,
            overflowX: "auto",
            whiteSpace: "pre",
            wordBreak: "normal",
            overflowWrap: "normal",
            textAlign: "left",
            fontFamily:
              'ui-monospace, SFMono-Regular, SFMono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: "0.95rem",
            lineHeight: 1.6,
            padding: "1rem",
            fontVariantLigatures: "none",
          },

          "& pre code": {
            backgroundColor: "transparent !important",
            color: "inherit !important",
            padding: 0,
            whiteSpace: "pre",
            wordBreak: "normal",
            overflowWrap: "normal",
            textAlign: "left",
            fontFamily:
              'ui-monospace, SFMono-Regular, SFMono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontVariantLigatures: "none",
          },

          "& img": {
            maxWidth: "100%",
          },
        })}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug, rehypeHighlight]}
        >
          {markdownContent}
        </ReactMarkdown>
      </Box>

      <Box
        sx={{
          mt: 4,
          pt: 3,
          borderTop: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box>
          {previousSection && (
            <Button
              component={RouterLink}
              to={`/repos/${project.slug}/${previousSection.id}`}
              variant="outlined"
            >
              Back: {previousSection.title}
            </Button>
          )}
        </Box>

        <Box>
          {nextSection && (
            <Button
              component={RouterLink}
              to={`/repos/${project.slug}/${nextSection.id}`}
              variant="contained"
            >
              Next: {nextSection.title}
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}