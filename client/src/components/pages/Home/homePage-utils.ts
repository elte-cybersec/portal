import { NODE_TYPES } from "./homePage-model";
import type { Edge, NetworkNode, Packet } from "./homePage-model";

export function createNodes(width: number, height: number): NetworkNode[] {
  const count = Math.min(30, Math.max(12, Math.floor((width * height) / 8000)));
  const nodes: NetworkNode[] = [];

  for (let i = 0; i < count; i += 1) {
    const nodeType = NODE_TYPES[Math.floor(Math.random() * NODE_TYPES.length)];

    nodes.push({
      x: 60 + Math.random() * Math.max(1, width - 120),
      y: 60 + Math.random() * Math.max(1, height - 120),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: nodeType.size,
      color: nodeType.color,
      label: nodeType.label,
      threat: nodeType.label === "threat actor",
      alpha: 0.7 + Math.random() * 0.3,
      pulseOffset: Math.random() * Math.PI * 2,
      id: i,
    });
  }

  return nodes;
}

export function createEdges(nodes: NetworkNode[]): Edge[] {
  const edges: Edge[] = [];

  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;

      if (Math.sqrt(dx * dx + dy * dy) < 180 && Math.random() < 0.35) {
        edges.push({
          a: i,
          b: j,
          encrypted: Math.random() < 0.4,
        });
      }
    }
  }

  return edges;
}

export function createPacket(edges: Edge[]): Packet | null {
  if (edges.length === 0) return null;

  const edge = edges[Math.floor(Math.random() * edges.length)];

  return {
    edge,
    t: Math.random(),
    speed: 0.003 + Math.random() * 0.004,
    dir: Math.random() < 0.5 ? 1 : -1,
    color: edge.encrypted ? "#7f77dd" : "#1d9e75",
  };
}