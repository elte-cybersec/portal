import { useState } from "react";
import {
  Box,
  Collapse,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { teamData } from "../../../data/teamData";
import TeamCard from "./TeamCard";
import TeamMiniCard from "./TeamMiniCard";


const MINI_CARD_CATEGORIES = ["Students Alumni"];


export default function TeamPage() {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleSection = (category: string) => {
    setCollapsed((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 2.5 } }}>
      <Stack spacing={3}>
        <Typography
          color="text.secondary"
          sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
        >
          Meet the people behind the ELTE Cybersecurity Lab
        </Typography>

        {teamData.map((group) => {
          const isMini = MINI_CARD_CATEGORIES.includes(group.category);
          const isCollapsed = !!collapsed[group.category];

          return (
            <Box key={group.category}>
              <Box
                onClick={() => toggleSection(group.category)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: isCollapsed ? 0 : 1.5,
                  cursor: "pointer",
                  userSelect: "none",
                  "&:hover .section-title": { opacity: 0.75 },
                }}
              >
                <Typography
                  className="section-title"
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    color: "primary.main",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                    transition: "opacity 0.2s",
                  }}
                >
                  {group.category}
                </Typography>

                <Divider sx={{ flex: 1 }} />

                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    color: "text.disabled",
                    whiteSpace: "nowrap",
                  }}
                >
                  {group.members.length}{" "}
                  {group.members.length === 1 ? "member" : "members"}
                </Typography>

                <ExpandMoreIcon
                  sx={{
                    fontSize: "1.1rem",
                    color: "text.disabled",
                    flexShrink: 0,
                    transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease",
                  }}
                />
              </Box>

              <Collapse in={!isCollapsed} timeout={250}>
                {isMini ? (

                  <Stack spacing={1}>
                    {chunk(group.members, 2).map((pair, rowIndex) => (
                      <Box
                        key={rowIndex}
                        sx={{
                          display: "grid",
                          gridTemplateColumns:
                            pair.length === 2 ? "1fr 1fr" : "1fr",
                          border: 1,
                          borderColor: "divider",
                          borderRadius: 1,
                          overflow: "hidden",
                          bgcolor: "background.paper",
                        }}
                      >
                        {pair.map((member, i) => (
                          <Box
                            key={`${member.name}-${member.familyName}`}
                            sx={{
                              borderRight:
                                pair.length === 2 && i === 0 ? 1 : 0,
                              borderColor: "divider",
                            }}
                          >
                            <TeamMiniCard member={member} />
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Stack>
                ) : (

                  <Stack spacing={1.5}>
                    {group.members.map((member, index) => (
                      <TeamCard
                        key={`${member.name}-${member.familyName}-${index}`}
                        member={member}
                      />
                    ))}
                  </Stack>
                )}
              </Collapse>
            </Box>
          );
        })}
      </Stack>
    </Container>
  );
}

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}