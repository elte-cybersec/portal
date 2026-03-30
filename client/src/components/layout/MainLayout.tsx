import Header from "./header-footer/Header";
import Footer from "./header-footer/Footer";
import { Outlet } from "react-router-dom";



export default function MainLayout() {
  return (
    <>
      <Header/>
      <Outlet />
      <Footer />
    </>
  );
}