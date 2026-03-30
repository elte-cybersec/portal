import { Navigate, useParams } from "react-router-dom";
import RepoPage from "./RepoPage";
import type { RepositoryPageMeta } from "../../types";

interface RepoPageWrapperProps {
  repositoryPages: RepositoryPageMeta[];
}

export default function RepoPageWrapper({
  repositoryPages,
}: RepoPageWrapperProps) {
  const { slug } = useParams<{ slug: string }>();

  const repo = repositoryPages.find((item) => item.slug === slug);

  if (!repo) {
    return <Navigate to="/projects" replace />;
  }

  return <RepoPage content={repo.content} />;
}