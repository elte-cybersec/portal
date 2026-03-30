import { Navigate, useParams } from "react-router-dom";
import RepoPage from "./RepoPage";
import type { ParsedProjectData } from "../../types";

interface RepoPageWrapperProps {
  parsedProjects: ParsedProjectData[];
}

export default function RepoPageWrapper({
  parsedProjects,
}: RepoPageWrapperProps) {
  const { projectSlug, topicId } = useParams<{
    projectSlug: string;
    topicId?: string;
  }>();

  const parsedProject = parsedProjects.find(
    (item) => item.project.slug === projectSlug,
  );

  if (!parsedProject) {
    return <Navigate to="/projects" replace />;
  }

  const { project, document } = parsedProject;
  const { sections } = document;

  if (!sections.length) {
    return <Navigate to="/projects" replace />;
  }

  if (!topicId) {
    return (
      <Navigate
        to={`/repos/${project.slug}/${sections[0].id}`}
        replace
      />
    );
  }

  const currentSection = sections.find((section) => section.id === topicId);

  if (!currentSection) {
    return (
      <Navigate
        to={`/repos/${project.slug}/${sections[0].id}`}
        replace
      />
    );
  }

  return (
    <RepoPage
      project={project}
      currentSection={currentSection}
      sections={sections}
    />
  );
}