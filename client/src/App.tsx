import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/about/AboutPage";
import ContactPage from "./components/pages/contact-us/ContactPage";
import RepoPage from "./components/pages/RepoPage";
import { getRepositoryPages } from "./hooks/getRepositoryPages";

export default function App() {
  const repositoryPages = getRepositoryPages();

  return (
    <Routes>
      <Route element={<MainLayout repositoryPages={repositoryPages} />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />

        {repositoryPages.map((repo) => (
          <Route
            key={repo.slug}
            path={`repos/${repo.slug}`}
            element={<RepoPage slug={repo.slug} />}
          />
        ))}
      </Route>
    </Routes>
  );
}