import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { siteConfig } from "../../../data/siteConfig";


export default function Header() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return isDesktop ? (
    <HeaderDesktop
      title={siteConfig.siteTitle}
      sticky
    />
  ) : (
    <HeaderMobile
      title={siteConfig.siteTitle}
      sticky
    />
  );
}