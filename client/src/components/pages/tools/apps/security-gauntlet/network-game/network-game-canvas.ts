import { THEME } from "../gauntlet.types";
import type { Edge, NetNode } from "./network-game-types";
import { H, NODE_R, W } from "./network-game-types";

export function drawGraph(
  canvas: HTMLCanvasElement,
  nodes: NetNode[],
  edges: Edge[],
  path: number[]
) {
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

  nodes.forEach((node) => {
        let fill: string = THEME.bgCard;
        let stroke: string = THEME.greenBorder;
        let label: string = "O";

        if (node.start) {
            fill = THEME.green;
            stroke = THEME.green;
            label = "UE";
        } else if (node.target) {
            fill = THEME.purple;
            stroke = THEME.purple;
            label = "gNB";
        } else if (node.threat) {
            fill = THEME.red;
            stroke = THEME.red;
            label = "X";
        } else if (path.includes(node.id)) {
            fill = THEME.greenDark;
            stroke = THEME.green;
    }

    ctx.beginPath();
    ctx.arc(node.x, node.y, NODE_R, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = THEME.textPrimary;
    ctx.font = "9px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, node.x, node.y);
  });
}