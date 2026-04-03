import { type GauntletScores, THEME } from "./gauntlet.types";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";

interface ResultsProps {
  scores: GauntletScores;
  onRestart: () => void;
}

const RANKS: [number, string][] = [
  [0, "Script kiddie - keep practicing"],
  [200, "Junior analyst - not bad"],
  [400, "Security engineer - solid skills"],
  [600, "Threat hunter - impressive"],
  [800, "Red team lead - elite"],
  [950, "CISO material - legendary"],
];

const GAME_LABELS: { key: keyof GauntletScores; label: string; color: string }[] = [
  { key: "caesar", label: "Caesar cipher", color: THEME.blue },
  { key: "keystone", label: "Keystone auth", color: THEME.green },
  { key: "network", label: "Packet routing", color: THEME.purple },
  { key: "gradient", label: "Gradient defender", color: "#d85a30" },
];

export default function Results({ scores, onRestart }: ResultsProps) {
  const total = scores.caesar + scores.keystone + scores.network + scores.gradient;

  let rank = RANKS[0][1];
  for (const [threshold, label] of RANKS) {
    if (total >= threshold) rank = label;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        minHeight: 520,
        background: THEME.bg,
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: 2,
          color: THEME.green,
          textTransform: "uppercase",
          marginBottom: 8,
          fontFamily: "monospace",
        }}
      >
        Gauntlet complete
      </div>

      <h1
        style={{
          fontSize: "clamp(1.4rem, 4vw, 2rem)",
          fontWeight: 500,
          color: THEME.textPrimary,
          marginBottom: 4,
        }}
      >
        Your final score
      </h1>

      <div
        style={{
          fontSize: 64,
          fontWeight: 500,
          color: THEME.green,
          fontFamily: "monospace",
          margin: "0.5rem 0",
          lineHeight: 1,
        }}
      >
        {total}
      </div>

      <div
        style={{
          fontSize: 13,
          color: THEME.textMuted,
          marginBottom: "1.5rem",
          fontFamily: "monospace",
        }}
      >
        {rank}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          width: "100%",
          maxWidth: 420,
          marginBottom: "1.5rem",
        }}
      >
        {GAME_LABELS.map(({ key, label, color }) => (
          <div
            key={key}
            style={{
              background: THEME.bgCard,
              border: `0.5px solid ${THEME.greenBorder}`,
              borderRadius: 8,
              padding: 12,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 500,
                color,
                fontFamily: "monospace",
              }}
            >
              {scores[key]}
            </div>
            <div
              style={{
                fontSize: 11,
                color: THEME.textDim,
                marginTop: 2,
                fontFamily: "monospace",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ width: "100%", maxWidth: 420, marginBottom: "1.5rem" }}>
        {GAME_LABELS.map(({ key, label, color }) => {
          const maxScore = key === "gradient" ? 300 : 500;
          const pct = Math.min(100, (scores[key] / maxScore) * 100);

          return (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: THEME.textMuted,
                  fontFamily: "monospace",
                  width: 120,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {label}
              </div>

              <div
                style={{
                  flex: 1,
                  height: 4,
                  background: THEME.greenBorder,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: color,
                    width: `${pct}%`,
                    borderRadius: 2,
                    transition: "width 0.8s ease",
                  }}
                />
              </div>

              <div
                style={{
                  fontSize: 11,
                  color,
                  fontFamily: "monospace",
                  width: 36,
                  textAlign: "left",
                }}
              >
                {scores[key]}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <Button
          onClick={onRestart}
          variant="contained"
          color="primary"
          sx={{
            px: 3.5,
            py: 1.25,
            fontSize: 14,
            fontFamily: "inherit",
          }}
        >
          Play again
        </Button>

        <Button
          component={RouterLink}
          to="/projects"
          variant="contained"
          color="primary"
          sx={{
            px: 3,
            py: 1.1,
            fontSize: 13,
            fontFamily: "inherit",
          }}
        >
          Check the projects
        </Button>
      </div>
    </div>
  );
}