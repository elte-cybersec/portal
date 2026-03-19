import Header from "./header-footer/Header";
import Footer from "./header-footer/Footer";
import { Outlet } from "react-router-dom";
import type { RepositoryPageMeta } from "../../types";

interface MainLayoutProps {
  repositoryPages: RepositoryPageMeta[];
}

export default function MainLayout({ repositoryPages }: MainLayoutProps) {
  return (
    <>
      <Header repositoryPages={repositoryPages} />
      <Outlet />
      <Footer />
    </>
  );
}