import React, { useState, useEffect, useCallback, useRef } from "react";
import { type GameProps, THEME } from "../gauntlet.types";
import {
  TimerBar,
  ScoreRow,
  GameBox,
  GameHeader,
  Feedback,
} from "../gauntlet.ui";
import { drawGraph } from "./network-game-canvas";
import {
  areConnected,
  generateGraph,
  getClickedNode,
} from "./network-game-logic";
import type { NetGraph } from "./network-game-types";
import { H, NODE_R, ROUNDS, ROUND_TIME, W } from "./network-game-types";

export default function NetworkGame({ onComplete }: GameProps) {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [graph, setGraph] = useState<NetGraph>(() => generateGraph(0));
  const [path, setPath] = useState<number[]>([0]);
  const [feedback, setFeedback] = useState<{
    text: string;
    type: "ok" | "err" | "none";
  }>({ text: "", type: "none" });
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
    if (canvasRef.current) {
      drawGraph(canvasRef.current, graph.nodes, graph.edges, path);
    }
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
    setFeedback({ text: "time up - packet lost", type: "err" });

    const nextRound = roundRef.current + 1;
    setTimeout(() => advanceRound(scoreRef.current, nextRound), 1400);
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

      const clickedNode = getClickedNode(nodes, cx, cy, NODE_R, currentId);
      if (!clickedNode) return;

      const connected = areConnected(edges, currentId, clickedNode.id);
      if (!connected) return;

      if (clickedNode.threat) {
        clearTimer();
        setLocked(true);
        setFeedback({ text: "threat node hit - packet lost!", type: "err" });

        const nextRound = roundRef.current + 1;
        setTimeout(() => advanceRound(scoreRef.current, nextRound), 1400);
        return;
      }

      const newPath = [...currentPath, clickedNode.id];
      setPath(newPath);
      pathRef.current = newPath;

      if (clickedNode.target) {
        clearTimer();
        setLocked(true);

        const pts = Math.round(50 + timeRef.current * 5);
        const newScore = scoreRef.current + pts;

        scoreRef.current = newScore;
        setScore(newScore);
        setFeedback({ text: `+${pts} pts - packet delivered!`, type: "ok" });

        const nextRound = roundRef.current + 1;
        setTimeout(() => advanceRound(newScore, nextRound), 1000);
      }
    },
    [locked, advanceRound]
  );

  const timePct = (timeLeft / ROUND_TIME) * 100;

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
        tag="Game 03 / 04 - Route the packet (5G)"
        title="Guide the packet to the gNB"
        sub="Click connected nodes to route - avoid red threat nodes"
      />

      <GameBox padding="1rem">
        <ScoreRow pills={[`score: ${score}`, `round: ${round}/${ROUNDS}`]} />
        <TimerBar pct={timePct} />

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginBottom: 8,
          }}
        >
          {[
            { color: THEME.green, label: "UE (start)" },
            { color: THEME.purple, label: "gNB (target)" },
            { color: THEME.red, label: "threat" },
          ].map(({ color, label }) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: color,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: THEME.textMuted,
                  fontFamily: "monospace",
                }}
              >
                {label}
              </span>
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