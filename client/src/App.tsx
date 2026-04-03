import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import RepositoryLayout from "./components/layout/RepositoryLayout";
import HomePage from "./components/pages/Home/HomePage";
import AboutPage from "./components/pages/about/AboutPage";
import ContactPage from "./components/pages/contact-us/ContactPage";
import Projects from "./components/pages/projects/Projects";
import RepoPageWrapper from "./components/pages/RepoPageWrapper";
import { getRepositoryPages } from "./utils/getRepositoryPages";
import { getParsedProjects } from "./utils/getProjects";
import { siteConfig } from "./data/siteConfig";
import CyberGauntlet from "./components/pages/tools/apps/security-gauntlet/CyberGauntlet";
import PublicationsPage from "./components/pages/publications/PublicationsPage";
import ToolsPage from "./components/pages/tools/ToolsPage";
import ToolDetailsPage from "./components/pages/tools/ToolDetailsPage";

export default function App() {
  const repositoryPages = getRepositoryPages();
  const parsedProjects = getParsedProjects(repositoryPages);
  const projects = parsedProjects.map((item) => item.project);

  useEffect(() => {
    document.title = siteConfig.browserTitle;
  }, []);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="projects" element={<Projects projects={projects} />} />
        <Route path="games" element={<CyberGauntlet />} />
        <Route path="publications" element={<PublicationsPage />} />
        

        <Route path="tools" element={<ToolsPage />} />
          <Route path="tools/:slug" element={<ToolDetailsPage />}
        />


        <Route
          path="repos/:projectSlug"
          element={<RepositoryLayout parsedProjects={parsedProjects} />}
        >
          <Route
            index
            element={<RepoPageWrapper parsedProjects={parsedProjects} />}
          />
          <Route
            path=":topicId"
            element={<RepoPageWrapper parsedProjects={parsedProjects} />}
          />
        </Route>
      </Route>
    </Routes>
  );
}