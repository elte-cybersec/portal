import { useState, useEffect, useCallback, useRef } from "react";
import { type GameProps, THEME } from "../gauntlet.types";
import {
  TimerBar,
  ScoreRow,
  GameBox,
  GameHeader,
  Feedback,
  PrimaryBtn,
} from "../gauntlet.ui";
import {
  calculateRoundScore,
  generateRound,
  getDecodedText,
  getNextShift,
  isCorrectGuess,
} from "./caesar-game-logic";
import {
  ROUND_TIME,
  ROUNDS,
  type DecodedStatus,
  type FeedbackType,
  type RoundState,
} from "./caesar-game-types";

export default function CaesarGame({ onComplete }: GameProps) {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [shift, setShift] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [feedback, setFeedback] = useState<{ text: string; type: FeedbackType }>({
    text: "",
    type: "none",
  });
  const [roundState, setRoundState] = useState<RoundState>(generateRound);
  const [locked, setLocked] = useState(false);
  const [decodedStatus, setDecodedStatus] = useState<DecodedStatus>("idle");

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
      setDecodedStatus("idle");

      timeRef.current = ROUND_TIME;
      roundRef.current = newRound;
    },
    [onComplete]
  );

  const handleFail = useCallback(
    (currentRound: RoundState) => {
      clearTimer();
      setLocked(true);
      setDecodedStatus("err");
      setFeedback({
        text: `time up - answer was shift ${currentRound.answer} -> ${currentRound.plain}`,
        type: "err",
      });

      const nextRound = roundRef.current + 1;
      setTimeout(() => {
        advanceRound(scoreRef.current, nextRound);
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

  const changeShift = (delta: number) => {
    if (locked) return;

    setShift((currentShift) => getNextShift(currentShift, delta));
    setDecodedStatus("idle");
  };

  const submit = () => {
    if (locked) return;

    clearTimer();
    setLocked(true);

    const correct = isCorrectGuess(roundState, shift);

    if (correct) {
      const pts = calculateRoundScore(timeRef.current);
      const newScore = scoreRef.current + pts;

      scoreRef.current = newScore;
      setScore(newScore);
      setDecodedStatus("ok");
      setFeedback({ text: `+${pts} pts - correct!`, type: "ok" });

      const nextRound = roundRef.current + 1;
      setTimeout(() => advanceRound(newScore, nextRound), 900);
      return;
    }

    setDecodedStatus("err");
    setFeedback({
      text: `wrong - answer was shift ${roundState.answer} -> ${roundState.plain}`,
      type: "err",
    });

    const nextRound = roundRef.current + 1;
    setTimeout(() => advanceRound(scoreRef.current, nextRound), 1500);
  };

  const decoded = getDecodedText(roundState, shift);
  const timePct = (timeLeft / ROUND_TIME) * 100;

  let decodedColor : string = THEME.textMuted;
  if (decodedStatus === "ok") decodedColor = THEME.green;
  if (decodedStatus === "err") decodedColor = THEME.red;

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
      }}
    >
      <GameHeader
        tag="Game 01 / 04 - Caesar cipher"
        title="Decrypt the message"
        sub="Find the shift value that reveals the hidden word"
      />

      <GameBox>
        <ScoreRow pills={[`score: ${score}`, `round: ${round}/${ROUNDS}`]} />
        <TimerBar pct={timePct} />

        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            color: THEME.blue,
            fontFamily: "monospace",
            margin: "1rem 0",
            textAlign: "center",
            wordBreak: "break-all",
          }}
        >
          {roundState.encrypted}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <button
            onClick={() => changeShift(-1)}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: THEME.bg,
              border: `0.5px solid ${THEME.greenBorder}`,
              color: THEME.green,
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            -
          </button>

          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              minWidth: 40,
              textAlign: "center",
              color: THEME.textPrimary,
              fontFamily: "monospace",
            }}
          >
            {shift}
          </div>

          <button
            onClick={() => changeShift(1)}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: THEME.bg,
              border: `0.5px solid ${THEME.greenBorder}`,
              color: THEME.green,
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +
          </button>
        </div>

        <div
          style={{
            fontSize: 16,
            letterSpacing: 3,
            color: decodedColor,
            fontFamily: "monospace",
            marginBottom: "1rem",
            textAlign: "center",
            minHeight: 24,
            transition: "color 0.2s",
          }}
        >
          {decoded}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <PrimaryBtn onClick={submit} disabled={locked}>
            Submit
          </PrimaryBtn>
        </div>

        <Feedback text={feedback.text} type={feedback.type} />
      </GameBox>
    </div>
  );
}