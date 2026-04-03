import { useEffect, useRef, useState, useCallback } from "react";
import { type GameProps, THEME } from "../gauntlet.types";
import { ScoreRow, GameHeader, Feedback } from "../gauntlet.ui";

const CW = 460;
const CH = 300;
const MODEL_W = 120;
const MODEL_H = 30;
const MODEL_X = CW / 2 - MODEL_W / 2;
const MODEL_Y = CH - 48;
const MAX_LIVES = 3;
const GAME_DURATION = 30;

interface Attack {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  hit: boolean;
  opacity: number;
}

let atkIdCounter = 0;

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export default function GradientGame({ onComplete }: GameProps) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [feedback, setFeedback] = useState<{ text: string; type: "ok" | "err" | "none" }>({
    text: "",
    type: "none",
  });
  const [gameOver, setGameOver] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const attacksRef = useRef<Attack[]>([]);
  const scoreRef = useRef(0);
  const livesRef = useRef(MAX_LIVES);
  const blockedRef = useRef(0);
  const tickRef = useRef(0);
  const runningRef = useRef(true);
  const animRef = useRef<number | null>(null);
  const gameTimeRef = useRef(GAME_DURATION);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);

  onCompleteRef.current = onComplete;

  const endGame = useCallback((finalScore: number) => {
    runningRef.current = false;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => onCompleteRef.current(finalScore), 1600);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;
    runningRef.current = true;

    function spawnAttack() {
      const speed = 1.0 + Math.random() * 1.2 + blockedRef.current * 0.025;
      attacksRef.current.push({
        id: atkIdCounter++,
        x: 20 + Math.random() * (CW - 40),
        y: -20,
        speed,
        size: 14 + Math.random() * 8,
        hit: false,
        opacity: 1,
      });
    }

    function loop() {
      if (!runningRef.current) return;

      tickRef.current++;
      ctx.clearRect(0, 0, CW, CH);

      const spawnInterval = Math.max(35, 90 - blockedRef.current * 1.5);
      if (tickRef.current % Math.round(spawnInterval) === 0) spawnAttack();

      ctx.fillStyle = THEME.bgCard;
      roundedRect(ctx, MODEL_X, MODEL_Y, MODEL_W, MODEL_H, 6);
      ctx.fill();

      ctx.strokeStyle = THEME.purple;
      ctx.lineWidth = 1;
      roundedRect(ctx, MODEL_X, MODEL_Y, MODEL_W, MODEL_H, 6);
      ctx.stroke();

      ctx.fillStyle = THEME.textSecondary;
      ctx.font = "11px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("FL model", CW / 2, MODEL_Y + MODEL_H / 2);

      const shield = "#7f77dd33";
      ctx.beginPath();
      ctx.arc(CW / 2, MODEL_Y + MODEL_H / 2, MODEL_W * 0.75, 0, Math.PI * 2);
      ctx.strokeStyle = shield;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = attacksRef.current.length - 1; i >= 0; i--) {
        const a = attacksRef.current[i];

        if (a.hit) {
          a.opacity -= 0.12;
          if (a.opacity <= 0) {
            attacksRef.current.splice(i, 1);
            continue;
          }
        } else {
          a.y += a.speed;

          if (a.y > MODEL_Y - a.size) {
            attacksRef.current.splice(i, 1);
            livesRef.current--;
            setLives(livesRef.current);

            if (livesRef.current <= 0) {
              setFeedback({ text: `model compromised — final score: ${scoreRef.current}`, type: "err" });
              setGameOver(true);
              endGame(scoreRef.current);
              return;
            }

            continue;
          }
        }

        ctx.globalAlpha = a.opacity;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
        ctx.fillStyle = THEME.red;
        ctx.fill();

        ctx.fillStyle = THEME.redLight;
        ctx.font = `${Math.round(a.size * 0.7)}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("ATK", a.x, a.y);
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = THEME.textDim;
      ctx.font = "10px monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(`blocked: ${blockedRef.current}`, 8, 8);

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);

    timerRef.current = setInterval(() => {
      gameTimeRef.current -= 1;
      setTimeLeft(gameTimeRef.current);

      if (gameTimeRef.current <= 0) {
        setFeedback({ text: `time up — score: ${scoreRef.current}`, type: "ok" });
        setGameOver(true);
        endGame(scoreRef.current);
      }
    }, 1000);

    return () => {
      runningRef.current = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [endGame]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!runningRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const cx = (e.clientX - rect.left) * (CW / rect.width);
    const cy = (e.clientY - rect.top) * (CH / rect.height);

    for (let i = attacksRef.current.length - 1; i >= 0; i--) {
      const a = attacksRef.current[i];
      if (a.hit) continue;

      const dx = a.x - cx;
      const dy = a.y - cy;

      if (dx * dx + dy * dy < a.size * a.size * 2.5) {
        a.hit = true;
        blockedRef.current++;
        scoreRef.current += 10;
        setScore(scoreRef.current);
        return;
      }
    }
  }, []);

  const timePct = (timeLeft / GAME_DURATION) * 100;

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
        tag="Game 04 / 04 — Gradient defender"
        title="Block the gradient attacks"
        sub="Click incoming attacks before they reach your FL model"
      />

      <div
        style={{
          background: THEME.bgCard,
          border: `0.5px solid ${THEME.greenBorder}`,
          borderRadius: 12,
          padding: "1rem",
          width: "100%",
          maxWidth: 520,
          margin: "1rem 0",
        }}
      >
        <ScoreRow pills={[`score: ${score}`, `lives: ${"♥".repeat(lives)}${"♡".repeat(MAX_LIVES - lives)}`, `${timeLeft}s`]} />

        <div
          style={{
            height: 4,
            background: THEME.greenBorder,
            borderRadius: 2,
            marginBottom: "1rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: timePct > 30 ? THEME.green : THEME.red,
              width: `${timePct}%`,
              transition: "width 1s linear",
              borderRadius: 2,
            }}
          />
        </div>

        <canvas
          ref={canvasRef}
          width={CW}
          height={CH}
          onClick={handleClick}
          style={{
            border: `0.5px solid ${THEME.greenBorder}`,
            borderRadius: 8,
            cursor: gameOver ? "default" : "crosshair",
            display: "block",
            margin: "0 auto",
            width: "100%",
            maxWidth: CW,
          }}
        />

        <Feedback text={feedback.text} type={feedback.type} />
      </div>
    </div>
  );
}