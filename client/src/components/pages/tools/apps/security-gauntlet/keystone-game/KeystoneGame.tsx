import React, { useState, useEffect, useCallback, useRef } from "react";
import { type GameProps, THEME } from "../gauntlet.types";
import { TimerBar, ScoreRow, GameBox, GameHeader, Feedback } from "../gauntlet.ui";

interface Scenario {
  q: string;
  correct: string;
  opts: string[];
}

const SCENARIOS: Scenario[] = [
  {
    q: "A CI/CD pipeline must authenticate to OpenStack APIs with no human interaction.",
    correct: "Application credentials",
    opts: ["Password", "TOTP", "OAuth", "Application credentials"],
  },
  {
    q: "A user logs in from an untrusted device. Admin requires a second factor beyond password.",
    correct: "TOTP",
    opts: ["Password", "TOTP", "OAuth", "Application credentials"],
  },
  {
    q: "A third-party dashboard wants OpenStack access on behalf of a user via a token grant flow.",
    correct: "OAuth",
    opts: ["Password", "TOTP", "OAuth", "Application credentials"],
  },
  {
    q: "An admin needs simple username + password login to configure Keystone for the first time.",
    correct: "Password",
    opts: ["Password", "TOTP", "OAuth", "Application credentials"],
  },
  {
    q: "A federated university IdP maps remote users into Keystone projects automatically.",
    correct: "OAuth",
    opts: ["Password", "TOTP", "OAuth", "Application credentials"],
  },
  {
    q: "A long-running batch job needs scoped access to a project without storing admin credentials.",
    correct: "Application credentials",
    opts: ["Password", "TOTP", "OAuth", "Application credentials"],
  },
  {
    q: "Security policy requires all logins to verify a time-based one-time code from an authenticator app.",
    correct: "TOTP",
    opts: ["Password", "TOTP", "OAuth", "Application credentials"],
  },
  {
    q: "A researcher logs into the OpenStack dashboard using their university SSO login.",
    correct: "OAuth",
    opts: ["Password", "TOTP", "OAuth", "Application credentials"],
  },
];

const ROUND_TIME = 18;
const ROUNDS = 5;

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function KeystoneGame({ onComplete }: GameProps) {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [scenario, setScenario] = useState<Scenario>(SCENARIOS[0]);
  const [shuffledOpts, setShuffledOpts] = useState<string[]>(() => shuffle(SCENARIOS[0].opts));
  const [chosen, setChosen] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; type: "ok" | "err" | "none" }>({ text: "", type: "none" });
  const [locked, setLocked] = useState(false);
  const [usedIndices, setUsedIndices] = useState<number[]>([0]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeRef = useRef(ROUND_TIME);
  const scoreRef = useRef(0);
  const roundRef = useRef(1);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const pickScenario = (used: number[]): { s: Scenario; idx: number } => {
    const available = SCENARIOS.map((_, i) => i).filter((i) => !used.includes(i));
    const idx = available.length > 0 ? available[Math.floor(Math.random() * available.length)] : Math.floor(Math.random() * SCENARIOS.length);
    return { s: SCENARIOS[idx], idx };
  };

  const advanceRound = useCallback(
    (newScore: number, newRound: number, used: number[]) => {
      if (newRound > ROUNDS) {
        onComplete(newScore);
        return;
      }
      const { s, idx } = pickScenario(used);
      const newUsed = [...used, idx];
      setRound(newRound);
      setScore(newScore);
      setScenario(s);
      setShuffledOpts(shuffle(s.opts));
      setChosen(null);
      setFeedback({ text: "", type: "none" });
      setLocked(false);
      setUsedIndices(newUsed);
      setTimeLeft(ROUND_TIME);
      timeRef.current = ROUND_TIME;
      roundRef.current = newRound;
    },
    [onComplete]
  );

  const handleTimeout = useCallback(
    (s: Scenario, used: number[]) => {
      clearTimer();
      setLocked(true);
      setFeedback({ text: `time up — correct: ${s.correct}`, type: "err" });
      const next = roundRef.current + 1;
      setTimeout(() => advanceRound(scoreRef.current, next, used), 1500);
    },
    [advanceRound]
  );

  useEffect(() => {
    timeRef.current = ROUND_TIME;
    clearTimer();
    const currentScenario = scenario;
    const currentUsed = usedIndices;
    timerRef.current = setInterval(() => {
      timeRef.current -= 0.1;
      setTimeLeft(parseFloat(timeRef.current.toFixed(1)));
      if (timeRef.current <= 0) {
        clearTimer();
        handleTimeout(currentScenario, currentUsed);
      }
    }, 100);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario]);

  const answer = (opt: string) => {
    if (locked) return;
    clearTimer();
    setLocked(true);
    setChosen(opt);
    if (opt === scenario.correct) {
      const pts = Math.round(50 + timeRef.current * 5);
      const newScore = scoreRef.current + pts;
      scoreRef.current = newScore;
      setScore(newScore);
      setFeedback({ text: `+${pts} pts — correct!`, type: "ok" });
      const next = roundRef.current + 1;
      setTimeout(() => advanceRound(newScore, next, usedIndices), 1200);
    } else {
      setFeedback({ text: `wrong — correct: ${scenario.correct}`, type: "err" });
      const next = roundRef.current + 1;
      setTimeout(() => advanceRound(scoreRef.current, next, usedIndices), 1500);
    }
  };

  const timePct = (timeLeft / ROUND_TIME) * 100;

  const getBtnStyle = (opt: string) => {
    const base: React.CSSProperties = {
      background: THEME.bgDeep,
      border: `0.5px solid ${THEME.greenBorder}`,
      borderRadius: 8,
      padding: "10px 12px",
      fontSize: 13,
      cursor: locked ? "default" : "pointer",
      color: THEME.textSecondary,
      fontFamily: "monospace",
      textAlign: "left" as const,
      transition: "all 0.15s",
      width: "100%",
    };
    if (!locked) return base;
    if (opt === scenario.correct) return { ...base, borderColor: THEME.green, background: "#051a10", color: THEME.green };
    if (opt === chosen && opt !== scenario.correct) return { ...base, borderColor: THEME.red, background: "#1a0505", color: THEME.red };
    return { ...base, opacity: 0.4 };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem", minHeight: 520, background: THEME.bg, justifyContent: "center" }}>
      <GameHeader
        tag="Game 02 / 04 — Keystone auth"
        title="Pick the right auth method"
        sub="Choose the most appropriate authentication for each scenario"
      />
      <GameBox>
        <ScoreRow pills={[`score: ${score}`, `round: ${round}/${ROUNDS}`]} />
        <TimerBar pct={timePct} />

        <div style={{ background: THEME.bgDeep, border: `0.5px solid ${THEME.greenBorder}`, borderRadius: 8, padding: 12, textAlign: "left", marginBottom: "1rem" }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: THEME.textDim, marginBottom: 4, fontFamily: "monospace" }}>SCENARIO</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: THEME.textSecondary, fontFamily: "monospace" }}>{scenario.q}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {shuffledOpts.map((opt) => (
            <button key={opt} onClick={() => answer(opt)} style={getBtnStyle(opt)}>
              {opt}
            </button>
          ))}
        </div>

        <Feedback text={feedback.text} type={feedback.type} />
      </GameBox>
    </div>
  );
}
