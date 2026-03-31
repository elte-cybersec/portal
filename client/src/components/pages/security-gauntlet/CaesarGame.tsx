import React, { useState, useEffect, useCallback, useRef } from "react";
import { type GameProps, THEME } from "./gauntlet.types";
import { TimerBar, ScoreRow, GameBox, GameHeader, Feedback, PrimaryBtn } from "./gauntlet.ui";

const WORDS = [
  "CRYPTO", "CIPHER", "PACKET", "TUNNEL", "SECURE",
  "HASHED", "SIGNED", "KERNEL", "SOCKET", "FERNET",
  "GRANTS", "TOKENS", "NONCE", "SALTED", "PROOFS",
];

const ROUND_TIME = 20;
const ROUNDS = 5;

function caesarShift(str: string, shift: number): string {
  return str
    .split("")
    .map((c) => {
      if (c >= "A" && c <= "Z") {
        return String.fromCharCode(((c.charCodeAt(0) - 65 + shift + 26) % 26) + 65);
      }
      return c;
    })
    .join("");
}

interface RoundState {
  plain: string;
  encrypted: string;
  answer: number;
}

function generateRound(): RoundState {
  const plain = WORDS[Math.floor(Math.random() * WORDS.length)];
  const answer = Math.floor(Math.random() * 23) + 1;
  const encrypted = caesarShift(plain, answer);
  return { plain, encrypted, answer };
}

export default function CaesarGame({ onComplete }: GameProps) {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [shift, setShift] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [feedback, setFeedback] = useState<{ text: string; type: "ok" | "err" | "none" }>({ text: "", type: "none" });
  const [roundState, setRoundState] = useState<RoundState>(generateRound);
  const [locked, setLocked] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeRef = useRef(ROUND_TIME);
  const scoreRef = useRef(0);
  const roundRef = useRef(1);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const advanceRound = useCallback(
    (newScore: number, newRound: number) => {
      if (newRound > ROUNDS) {
        onComplete(newScore);
        return;
      }
      setRound(newRound);
      setShift(0);
      setTimeLeft(ROUND_TIME);
      setFeedback({ text: "", type: "none" });
      setRoundState(generateRound());
      setLocked(false);
      timeRef.current = ROUND_TIME;
      roundRef.current = newRound;
    },
    [onComplete]
  );

  const handleFail = useCallback(
    (rs: RoundState) => {
      clearTimer();
      setLocked(true);
      setFeedback({ text: `time up — answer was shift ${rs.answer} → ${rs.plain}`, type: "err" });
      const next = roundRef.current + 1;
      setTimeout(() => {
        scoreRef.current = scoreRef.current;
        advanceRound(scoreRef.current, next);
      }, 1500);
    },
    [advanceRound]
  );

  useEffect(() => {
    timeRef.current = ROUND_TIME;
    clearTimer();
    timerRef.current = setInterval(() => {
      timeRef.current -= 0.1;
      setTimeLeft(parseFloat(timeRef.current.toFixed(1)));
      if (timeRef.current <= 0) {
        clearTimer();
        handleFail(roundState);
      }
    }, 100);
    return clearTimer;
  }, [roundState, handleFail]);

  const changeShift = (d: number) => {
    if (locked) return;
    setShift((s) => ((s + d + 26) % 26));
  };

  const submit = () => {
    if (locked) return;
    clearTimer();
    setLocked(true);
    const decoded = caesarShift(roundState.encrypted, shift);
    if (decoded === roundState.plain) {
      const pts = Math.round(50 + timeRef.current * 5);
      const newScore = scoreRef.current + pts;
      scoreRef.current = newScore;
      setScore(newScore);
      setFeedback({ text: `+${pts} pts — correct!`, type: "ok" });
      const next = roundRef.current + 1;
      setTimeout(() => advanceRound(newScore, next), 900);
    } else {
      setFeedback({ text: `wrong — answer was shift ${roundState.answer} → ${roundState.plain}`, type: "err" });
      const next = roundRef.current + 1;
      setTimeout(() => advanceRound(scoreRef.current, next), 1500);
    }
  };

  const decoded = caesarShift(roundState.encrypted, shift);
  const timePct = (timeLeft / ROUND_TIME) * 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem", minHeight: 520, background: THEME.bg, justifyContent: "center" }}>
      <GameHeader
        tag={`Game 01 / 04 — Caesar cipher`}
        title="Decrypt the message"
        sub="Find the shift value that reveals the hidden word"
      />
      <GameBox>
        <ScoreRow pills={[`score: ${score}`, `round: ${round}/${ROUNDS}`]} />
        <TimerBar pct={timePct} />

        <div style={{ fontSize: 26, letterSpacing: 6, color: THEME.blue, fontFamily: "monospace", margin: "1rem 0", textAlign: "center", wordBreak: "break-all" }}>
          {roundState.encrypted}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", marginBottom: "1rem" }}>
          <button
            onClick={() => changeShift(-1)}
            style={{ width: 36, height: 36, borderRadius: "50%", background: THEME.bg, border: `0.5px solid ${THEME.greenBorder}`, color: THEME.green, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            −
          </button>
          <div style={{ fontSize: 24, fontWeight: 500, minWidth: 40, textAlign: "center", color: THEME.textPrimary, fontFamily: "monospace" }}>
            {shift}
          </div>
          <button
            onClick={() => changeShift(1)}
            style={{ width: 36, height: 36, borderRadius: "50%", background: THEME.bg, border: `0.5px solid ${THEME.greenBorder}`, color: THEME.green, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            +
          </button>
        </div>

        <div style={{ fontSize: 16, letterSpacing: 3, color: decoded === roundState.plain ? THEME.green : THEME.textMuted, fontFamily: "monospace", marginBottom: "1rem", textAlign: "center", minHeight: 24, transition: "color 0.2s" }}>
          {decoded}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <PrimaryBtn onClick={submit} disabled={locked}>Submit</PrimaryBtn>
        </div>

        <Feedback text={feedback.text} type={feedback.type} />
      </GameBox>
    </div>
  );
}
