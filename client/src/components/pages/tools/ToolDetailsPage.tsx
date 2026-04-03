import { Navigate, useParams } from "react-router-dom";

import { toolsData } from "../../../data/toolsData";
import AncientCipherPage from "./apps/ancient-cipher/AncientCipherPage";
import CyberGauntlet from "./apps/security-gauntlet/CyberGauntlet";


export default function ToolDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = toolsData.find((tool) => tool.slug === slug);

  if (!tool) {
    return <Navigate to="/tools" replace />;
  }

  switch (tool.slug) {
    case "ancient-cipher":
      return <AncientCipherPage />;

    case "security-gauntlet":
      return (
            <CyberGauntlet />
      );

    default:
      return <Navigate to="/tools" replace />;
  }
}