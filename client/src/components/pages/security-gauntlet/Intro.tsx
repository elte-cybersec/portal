import { THEME } from "./gauntlet.types";

interface IntroProps {
  onStart: () => void;
}

const GAMES = [
  { color: THEME.green, label: "01. Caesar cipher breaker" },
  { color: THEME.blue, label: "02. Keystone auth challenge" },
  { color: THEME.purple, label: "03. Route the packet (5G)" },
  { color: "#d85a30", label: "04. Gradient defender (FL)" },
];

export default function Intro({ onStart }: IntroProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 520,
        padding: "2rem",
        background: THEME.bg,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: "3px",
          color: THEME.green,
          textTransform: "uppercase",
          marginBottom: 8,
          fontFamily: "monospace",
        }}
      >
        ELTE Cybersecurity Lab
      </div>

      <h1
        style={{
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
          fontWeight: 500,
          color: THEME.textPrimary,
          marginBottom: 8,
          lineHeight: 1.2,
        }}
      >
        Cyber gauntlet
      </h1>

      <p
        style={{
          fontSize: 13,
          color: THEME.textMuted,
          lineHeight: 1.6,
          maxWidth: 360,
          margin: "0 auto 1.5rem",
        }}
      >
        4 mini-games. Real cybersecurity concepts. How high can you score?
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: "1.5rem",
          width: "100%",
          maxWidth: 320,
        }}
      >
        {GAMES.map(({ color, label }) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: THEME.bgCard,
              border: `0.5px solid ${THEME.greenBorder}`,
              borderRadius: 8,
              padding: "10px 14px",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: THEME.textSecondary, fontFamily: "monospace" }}>{label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        style={{
          background: THEME.green,
          color: THEME.textPrimary,
          border: "none",
          padding: "10px 32px",
          borderRadius: 8,
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = THEME.greenDark;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = THEME.green;
        }}
      >
        Start gauntlet
      </button>
    </div>
  );
}