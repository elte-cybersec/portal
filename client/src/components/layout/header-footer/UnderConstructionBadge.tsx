import { Box, Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function UnderConstructionBadge() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 34,
        left: -55,
        width: 210,
        bgcolor: "#cc0000",
        transform: "rotate(-35deg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.75,
        py: "5px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <ConstructionIcon sx={{ fontSize: "0.85rem", color: "#fff" }} />
      <Typography
        sx={{
          fontSize: "0.7rem",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontFamily: "monospace",
          lineHeight: 1,
        }}
      >
        Under Dev
      </Typography>
    </Box>
  );
}