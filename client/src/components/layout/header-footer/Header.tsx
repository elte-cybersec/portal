import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { RepositoryPageMeta } from "../../../types";

interface HeaderProps {
  repositoryPages: RepositoryPageMeta[];
}

export default function Header({ repositoryPages }: HeaderProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return isDesktop ? (
    <HeaderDesktop
      title="ELTE Cybersecurity"
      sticky
      repositoryPages={repositoryPages}
    />
  ) : (
    <HeaderMobile
      title="ELTE Cybersecurity"
      sticky
      repositoryPages={repositoryPages}
    />
  );
}