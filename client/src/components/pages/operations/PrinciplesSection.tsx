import { Box, Typography } from "@mui/material";
import type { OperationPrinciple } from "../../../data/operationPageData";
import { getPrincipleComponent, getFallbackIcon } from "./registry";

interface PrinciplesSectionProps {
  principles: OperationPrinciple[];
}

export default function PrinciplesSection({ principles }: PrinciplesSectionProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {principles.map((principle, index) => {
        const isReverse = index % 2 === 1;
        const Component = getPrincipleComponent(principle.componentKey);
        const FallbackIcon = getFallbackIcon(principle.iconFallback);

        const visual = Component ? (
          <Component />
        ) : (
          <Box
            sx={{
              width: "100%",
              aspectRatio: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FallbackIcon
              sx={{ fontSize: 56, color: "primary.main", opacity: 0.7 }}
            />
          </Box>
        );

        const label = String(index + 1).padStart(2, "0");

        return (
          <Box
            key={principle.id}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: isReverse ? "1fr 120px" : "120px 1fr",
              },
              gap: { xs: 2, md: 3.5 },
              alignItems: "start",
            }}
          >
            <Box
              sx={{
                order: { xs: 0, md: isReverse ? 2 : 0 },
                pt: { md: 0.5 },
                display: { xs: "none", md: "block" },
              }}
            >
              {visual}
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "0.65rem",
                  color: "text.disabled",
                  mt: 0.75,
                  letterSpacing: "0.1em",
                }}
              >
                {label} · {principle.title.toUpperCase()}
              </Typography>
            </Box>

            <Box sx={{ order: { xs: 1, md: 1 } }}>
              <Typography
                sx={{
                  color: "primary.main",
                  fontWeight: 500,
                  fontSize: "1rem",
                  mb: 1.25,
                }}
              >
                {principle.title}
              </Typography>
              <Typography
                sx={{
                  color: "text.primary",
                  fontSize: { xs: "0.875rem", md: "0.9rem" },
                  lineHeight: 1.75,
                }}
              >
                {principle.description}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}