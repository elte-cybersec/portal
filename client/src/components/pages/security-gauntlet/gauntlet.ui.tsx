import React from "react";
import { THEME } from "./gauntlet.types";

interface TimerBarProps {
  pct: number;
}
export function TimerBar({ pct }: TimerBarProps) {
  return (
    <div
      style={{
        height: 4,
        background: THEME.greenBorder,
        borderRadius: 2,
        width: "100%",
        marginBottom: "1rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          background: pct > 30 ? THEME.green : THEME.red,
          width: `${pct}%`,
          transition: "width 0.1s linear",
          borderRadius: 2,
        }}
      />
    </div>
  );
}

interface ScorePillProps {
  label: string;
}
export function ScorePill({ label }: ScorePillProps) {
  return (
    <div
      style={{
        background: THEME.bg,
        border: `0.5px solid ${THEME.greenBorder}`,
        borderRadius: 8,
        padding: "4px 14px",
        fontSize: 12,
        fontFamily: "monospace",
        color: THEME.green,
      }}
    >
      {label}
    </div>
  );
}

interface FeedbackProps {
  text: string;
  type: "ok" | "err" | "none";
}
export function Feedback({ text, type }: FeedbackProps) {
  const color = type === "ok" ? THEME.green : type === "err" ? THEME.red : "transparent";
  return (
    <div
      style={{
        fontSize: 13,
        minHeight: 20,
        marginTop: 8,
        fontFamily: "monospace",
        color,
        transition: "color 0.2s",
      }}
    >
      {text}
    </div>
  );
}

interface GameBoxProps {
  children: React.ReactNode;
  padding?: string;
}
export function GameBox({ children, padding = "1.5rem" }: GameBoxProps) {
  return (
    <div
      style={{
        background: THEME.bgCard,
        border: `0.5px solid ${THEME.greenBorder}`,
        borderRadius: 12,
        padding,
        width: "100%",
        maxWidth: 520,
        margin: "1rem 0",
      }}
    >
      {children}
    </div>
  );
}

interface GameHeaderProps {
  tag: string;
  title: string;
  sub: string;
}
export function GameHeader({ tag, title, sub }: GameHeaderProps) {
  return (
    <>
      <div
        style={{
          fontSize: 11,
          letterSpacing: "2px",
          color: THEME.green,
          textTransform: "uppercase",
          marginBottom: 8,
          fontFamily: "monospace",
        }}
      >
        {tag}
      </div>
      <h2
        style={{
          fontSize: "1.2rem",
          fontWeight: 500,
          marginBottom: 4,
          color: THEME.textPrimary,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: 13,
          color: THEME.textMuted,
          lineHeight: 1.6,
          maxWidth: 400,
          margin: "0 auto 0.5rem",
          textAlign: "center",
        }}
      >
        {sub}
      </p>
    </>
  );
}

interface ScoreRowProps {
  pills: string[];
}
export function ScoreRow({ pills }: ScoreRowProps) {
  return (
    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "1rem" }}>
      {pills.map((p, i) => (
        <ScorePill key={i} label={p} />
      ))}
    </div>
  );
}

interface PrimaryBtnProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}
export function PrimaryBtn({ onClick, children, disabled }: PrimaryBtnProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? THEME.greenBorder : THEME.green,
        color: THEME.textPrimary,
        border: "none",
        padding: "10px 28px",
        borderRadius: 8,
        fontSize: 14,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        transition: "background 0.15s",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
}
