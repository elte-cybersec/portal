import React, { useState, useEffect, useCallback, useRef } from "react";
import { type GameProps, THEME } from "./gauntlet.types";
import { TimerBar, ScoreRow, GameBox, GameHeader, Feedback } from "./gauntlet.ui";

interface NetNode {
  id: number;
  x: number;
  y: number;
  threat: boolean;
  start: boolean;
  target: boolean;
}

interface Edge {
  a: number;
  b: number;
}

interface NetGraph {
  nodes: NetNode[];
  edges: Edge[];
}

const W = 460;
const H = 280;
const ROUND_TIME = 22;
const ROUNDS = 5;
const NODE_R = 13;

function generateGraph(difficulty: number): NetGraph {
  const nodes: NetNode[] = [];
  const cols = 5;
  const rows = 3;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      nodes.push({
        id: nodes.length,
        x: 60 + (c * (W - 120)) / (cols - 1) + (Math.random() - 0.5) * 18,
        y: 50 + (r * (H - 100)) / (rows - 1) + (Math.random() - 0.5) * 14,
        threat: false,
        start: false,
        target: false,
      });
    }
  }

  nodes[0].start = true;
  nodes[nodes.length - 1].target = true;

  const numThreats = Math.min(2 + difficulty, 6);
  let placed = 0;
  while (placed < numThreats) {
    const idx = Math.floor(Math.random() * nodes.length);
    if (!nodes[idx].threat && !nodes[idx].start && !nodes[idx].target) {
      nodes[idx].threat = true;
      placed++;
    }
  }

  const edges: Edge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < 130) {
        edges.push({ a: i, b: j });
      }
    }
  }

  return { nodes, edges };
}

function drawGraph(canvas: HTMLCanvasElement, nodes: NetNode[], edges: Edge[], path: number[]) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);

  ctx.strokeStyle = THEME.greenBorder;
  ctx.lineWidth = 0.5;
  edges.forEach(({ a, b }) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a].x, nodes[a].y);
    ctx.lineTo(nodes[b].x, nodes[b].y);
    ctx.stroke();
  });

  nodes.forEach((n) => {
    let fill: string = THEME.bgCard;
    let stroke: string = THEME.greenBorder;
    let label: string = "O";

    if (n.start) {
      fill = THEME.green;
      stroke = THEME.green;
      label = "UE";
    } else if (n.target) {
      fill = THEME.purple;
      stroke = THEME.purple;
      label = "gNB";
    } else if (n.threat) {
      fill = THEME.red;
      stroke = THEME.red;
      label = "X";
    } else if (path.includes(n.id)) {
      fill = THEME.greenDark;
      stroke = THEME.green;
    }

    ctx.beginPath();
    ctx.arc(n.x, n.y, NODE_R, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = THEME.textPrimary;
    ctx.font = "9px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, n.x, n.y);
  });
}

export default function NetworkGame({ onComplete }: GameProps) {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [graph, setGraph] = useState<NetGraph>(() => generateGraph(0));
  const [path, setPath] = useState<number[]>([0]);
  const [feedback, setFeedback] = useState<{ text: string; type: "ok" | "err" | "none" }>({ text: "", type: "none" });
  const [locked, setLocked] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeRef = useRef(ROUND_TIME);
  const scoreRef = useRef(0);
  const roundRef = useRef(1);
  const graphRef = useRef(graph);
  const pathRef = useRef(path);

  graphRef.current = graph;
  pathRef.current = path;

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (canvasRef.current) drawGraph(canvasRef.current, graph.nodes, graph.edges, path);
  }, [graph, path]);

  const advanceRound = useCallback(
    (newScore: number, newRound: number) => {
      if (newRound > ROUNDS) {
        onComplete(newScore);
        return;
      }
      const newGraph = generateGraph(newRound - 1);
      setRound(newRound);
      setScore(newScore);
      setGraph(newGraph);
      setPath([0]);
      setFeedback({ text: "", type: "none" });
      setLocked(false);
      setTimeLeft(ROUND_TIME);
      timeRef.current = ROUND_TIME;
      roundRef.current = newRound;
    },
    [onComplete]
  );

  const handleTimeout = useCallback(() => {
    clearTimer();
    setLocked(true);
    setFeedback({ text: "time up — packet lost", type: "err" });
    const next = roundRef.current + 1;
    setTimeout(() => advanceRound(scoreRef.current, next), 1400);
  }, [advanceRound]);

  useEffect(() => {
    timeRef.current = ROUND_TIME;
    clearTimer();
    timerRef.current = setInterval(() => {
      timeRef.current -= 0.1;
      setTimeLeft(parseFloat(timeRef.current.toFixed(1)));
      if (timeRef.current <= 0) {
        clearTimer();
        handleTimeout();
      }
    }, 100);
    return clearTimer;
  }, [graph, handleTimeout]);

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (locked) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      const scaleY = H / rect.height;
      const cx = (e.clientX - rect.left) * scaleX;
      const cy = (e.clientY - rect.top) * scaleY;

      const { nodes, edges } = graphRef.current;
      const currentPath = pathRef.current;
      const currentId = currentPath[currentPath.length - 1];

      for (const n of nodes) {
        const dx = n.x - cx;
        const dy = n.y - cy;
        if (dx * dx + dy * dy < NODE_R * NODE_R * 2.5 && n.id !== currentId) {
          const connected = edges.some(({ a, b }) => (a === currentId && b === n.id) || (b === currentId && a === n.id));
          if (!connected) continue;

          if (n.threat) {
            clearTimer();
            setLocked(true);
            setFeedback({ text: "threat node hit — packet lost!", type: "err" });
            const next = roundRef.current + 1;
            setTimeout(() => advanceRound(scoreRef.current, next), 1400);
            return;
          }

          const newPath = [...currentPath, n.id];
          setPath(newPath);
          pathRef.current = newPath;

          if (n.target) {
            clearTimer();
            setLocked(true);
            const pts = Math.round(50 + timeRef.current * 5);
            const newScore = scoreRef.current + pts;
            scoreRef.current = newScore;
            setScore(newScore);
            setFeedback({ text: `+${pts} pts — packet delivered!`, type: "ok" });
            const next = roundRef.current + 1;
            setTimeout(() => advanceRound(newScore, next), 1000);
          }
          return;
        }
      }
    },
    [locked, advanceRound]
  );

  const timePct = (timeLeft / ROUND_TIME) * 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem", minHeight: 520, background: THEME.bg, justifyContent: "center" }}>
      <GameHeader
        tag="Game 03 / 04 — Route the packet (5G)"
        title="Guide the packet to the gNB"
        sub="Click connected nodes to route — avoid red threat nodes"
      />
      <GameBox padding="1rem">
        <ScoreRow pills={[`score: ${score}`, `round: ${round}/${ROUNDS}`]} />
        <TimerBar pct={timePct} />

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 8 }}>
          {[
            { color: THEME.green, label: "UE (start)" },
            { color: THEME.purple, label: "gNB (target)" },
            { color: THEME.red, label: "threat" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
              <span style={{ fontSize: 11, color: THEME.textMuted, fontFamily: "monospace" }}>{label}</span>
            </div>
          ))}
        </div>

        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={handleCanvasClick}
          style={{
            border: `0.5px solid ${THEME.greenBorder}`,
            borderRadius: 8,
            cursor: locked ? "default" : "pointer",
            display: "block",
            margin: "0 auto",
            width: "100%",
            maxWidth: W,
          }}
        />
        <Feedback text={feedback.text} type={feedback.type} />
      </GameBox>
    </div>
  );
}
