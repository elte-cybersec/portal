import type { ComponentType } from "react";
import {
  SupervisorAccount,
  Public,
  Groups,
  HelpOutline,
  type SvgIconComponent,
} from "@mui/icons-material";
import MentorEye from "./MentorEye";
import ShareOrbit from "./ShareOrbit";
import TeamPulse from "./TeamPulse";

export const principleComponents: Record<string, ComponentType> = {
  mentorEye: MentorEye,
  shareOrbit: ShareOrbit,
  teamPulse: TeamPulse,
};

const iconMap: Record<string, SvgIconComponent> = {
  SupervisorAccount,
  Public,
  Groups,
};

export function getPrincipleComponent(key?: string): ComponentType | null {
  if (!key) return null;
  return principleComponents[key] ?? null;
}

export function getFallbackIcon(name?: string): SvgIconComponent {
  if (!name) return HelpOutline;
  return iconMap[name] ?? HelpOutline;
}