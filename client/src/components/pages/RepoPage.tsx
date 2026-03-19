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
        sx={{
          backgroundColor: "transparent",
          "& table": {
            display: "table",
            width: "100%",
          },
        }}
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