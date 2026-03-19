import { Box, Container } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/github-dark.css";

interface RepoPageProps {
  content: string;
}

export default function RepoPage({ content }: RepoPageProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
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
          },

          "& pre": {
            backgroundColor: "#0d1117 !important",
            borderRadius: 2,
            overflowX: "auto",
          },

          "& pre code": {
            backgroundColor: "transparent !important",
            color: "inherit !important",
            padding: 0,
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
          {content}
        </ReactMarkdown>
      </Box>
    </Container>
  );
}