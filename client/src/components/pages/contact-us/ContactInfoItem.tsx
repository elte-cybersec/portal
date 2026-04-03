import { ListItem, ListItemIcon, ListItemText, Link } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

interface ContactInfoItemProps {
  icon: ReactNode;
  href: string;
  value: string;
  label: string;
}

const linkSx = (theme: Theme) => ({
  color: "primary.main",
  fontWeight: 500,
  textDecoration: "none",
  transition: "color 0.2s ease",
  "&:hover": {
    color:
      theme.palette.mode === "dark"
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
  },
});

export default function ContactInfoItem({
  icon,
  href,
  value,
  label,
}: ContactInfoItemProps) {
  return (
    <ListItem disableGutters sx={{ py: 0.4 }}>
      <ListItemIcon sx={{ minWidth: 32 }}>{icon}</ListItemIcon>
      <ListItemText
        primary={
          <Link href={href} underline="none" sx={linkSx}>
            {value}
          </Link>
        }
        secondary={label}
        slotProps={{
          primary: { sx: { fontSize: "0.95rem" } },
          secondary: { sx: { fontSize: "0.82rem" } },
        }}
      />
    </ListItem>
  );
}