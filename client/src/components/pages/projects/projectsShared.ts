import { useTheme } from "@mui/material";
import HubIcon from "@mui/icons-material/Hub";
import SecurityIcon from "@mui/icons-material/Security";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ScienceIcon from "@mui/icons-material/Science";
import MemoryIcon from "@mui/icons-material/Memory";
import PolicyIcon from "@mui/icons-material/Policy";
import StorageIcon from "@mui/icons-material/Storage";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GavelIcon from "@mui/icons-material/Gavel";

export const projectIconPool = [
  SecurityIcon,
  HubIcon,
  VerifiedUserIcon,
  CloudQueueIcon,
  ScienceIcon,
  MemoryIcon,
  PolicyIcon,
  StorageIcon,
  VpnKeyIcon,
  GavelIcon,
];

export const projectAccentPool = [
  "#85B7EB",
  "#5DCAA5",
  "#EF9F27",
  "#AFA9EC",
  "#E76EAA",
  "#F5C453",
  "#7DD3C0",
  "#C8B4EE",
  "#FFB088",
  "#9DCEEB",
];

export function getProjectColor(index: number) {
  return projectAccentPool[index % projectAccentPool.length] ?? "#20c7cf";
}

export function getProjectIcon(index: number) {
  return projectIconPool[index % projectIconPool.length] ?? SecurityIcon;
}

export function getProjectTags(title: string) {
  if (title.includes("B5G")) {
    return ["Authentication", "Rogue UE", "WAF", "Edge", "Slicing"];
  }

  if (title.includes("ML")) {
    return ["Federated Learning", "MPC", "Aggregation", "Privacy"];
  }

  if (title.includes("Compliance")) {
    return ["GDPR", "Controls", "Evidence", "Audits"];
  }

  if (title.includes("Cloud")) {
    return ["Keystone", "Tokens", "Access", "Identity"];
  }

  return [];
}

export function truncateLabel(value: string, max: number) {
  if (value.length <= max) return value;
  return value.slice(0, max - 1).trim() + "…";
}

export function hexToRgba(hex: string, alpha: number) {
  const normalizedHex = hex.replace("#", "");
  const red = parseInt(normalizedHex.slice(0, 2), 16);
  const green = parseInt(normalizedHex.slice(2, 4), 16);
  const blue = parseInt(normalizedHex.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function useProjectsSurfaces() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return {
    isDark,
    nodeFill: isDark ? "rgba(8, 20, 30, 0.95)" : "rgba(255, 255, 255, 0.95)",
    nodeFillSolid: isDark ? "#0d1f2d" : "#ffffff",
    deviceFrame: isDark
      ? "linear-gradient(140deg, rgba(40, 60, 76, 0.9), rgba(14, 24, 34, 0.95))"
      : "linear-gradient(140deg, rgba(220, 226, 232, 0.95), rgba(180, 188, 196, 0.95))",
    deviceScreen: isDark ? "rgba(7, 14, 22, 0.96)" : "rgba(248, 250, 252, 0.98)",
    deviceFrameBumps: isDark
      ? "linear-gradient(180deg, rgba(60, 80, 96, 0.95), rgba(30, 42, 54, 0.95))"
      : "linear-gradient(180deg, rgba(190, 198, 206, 0.95), rgba(150, 160, 170, 0.95))",
    deviceFrameBumpsRev: isDark
      ? "linear-gradient(0deg, rgba(60, 80, 96, 0.95), rgba(30, 42, 54, 0.95))"
      : "linear-gradient(0deg, rgba(190, 198, 206, 0.95), rgba(150, 160, 170, 0.95))",
    deviceCrown: isDark ? "rgba(50, 70, 86, 0.95)" : "rgba(160, 170, 180, 0.95)",
    deviceCrownSmall: isDark ? "rgba(50, 70, 86, 0.85)" : "rgba(160, 170, 180, 0.85)",
    nodeLabelIdle: theme.palette.text.secondary,
    nodeLabelHover: theme.palette.text.primary,
    centerLabelMuted: theme.palette.text.secondary,
    subProjectIdleBorder: isDark ? "rgba(255, 255, 255, 0.09)" : "rgba(0, 0, 0, 0.12)",
    subProjectIdleBg: isDark ? "rgba(255, 255, 255, 0.025)" : "rgba(0, 0, 0, 0.02)",
    gridPattern: isDark
      ? `linear-gradient(rgba(32, 199, 207, 0.035) 1px, transparent 1px),
         linear-gradient(90deg, rgba(32, 199, 207, 0.035) 1px, transparent 1px),
         radial-gradient(circle at 15% 20%, rgba(32, 199, 207, 0.12), transparent 30%),
         radial-gradient(circle at 85% 30%, rgba(180, 140, 255, 0.12), transparent 30%)`
      : `linear-gradient(rgba(32, 199, 207, 0.06) 1px, transparent 1px),
         linear-gradient(90deg, rgba(32, 199, 207, 0.06) 1px, transparent 1px),
         radial-gradient(circle at 15% 20%, rgba(32, 199, 207, 0.08), transparent 30%),
         radial-gradient(circle at 85% 30%, rgba(180, 140, 255, 0.08), transparent 30%)`,
    orbitRingStroke: isDark ? "rgba(32, 199, 207, 0.14)" : "rgba(32, 199, 207, 0.28)",
  };
}