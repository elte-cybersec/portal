import type { Edge, NetGraph, NetNode } from "./network-game-types";
import { H, W } from "./network-game-types";

function buildBaseNodes(): NetNode[] {
  const nodes: NetNode[] = [];
  const cols = 5;
  const rows = 3;

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
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

  return nodes;
}

function buildEdges(nodes: NetNode[]): Edge[] {
  const edges: Edge[] = [];

  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;

      if (Math.sqrt(dx * dx + dy * dy) < 130) {
        edges.push({ a: i, b: j });
      }
    }
  }

  return edges;
}

function buildAdjacency(nodes: NetNode[], edges: Edge[]): number[][] {
  const adjacency: number[][] = Array.from({ length: nodes.length }, () => []);

  for (const edge of edges) {
    adjacency[edge.a].push(edge.b);
    adjacency[edge.b].push(edge.a);
  }

  return adjacency;
}

function hasSafePath(nodes: NetNode[], edges: Edge[]): boolean {
  const startId = nodes.find((node) => node.start)?.id;
  const targetId = nodes.find((node) => node.target)?.id;

  if (startId === undefined || targetId === undefined) {
    return false;
  }

  const adjacency = buildAdjacency(nodes, edges);
  const visited = new Set<number>();
  const queue: number[] = [startId];
  visited.add(startId);

  while (queue.length > 0) {
    const current = queue.shift();
    if (current === undefined) continue;

    if (current === targetId) {
      return true;
    }

    for (const next of adjacency[current]) {
      if (visited.has(next)) continue;
      if (nodes[next].threat) continue;

      visited.add(next);
      queue.push(next);
    }
  }

  return false;
}

function applyThreats(nodes: NetNode[], difficulty: number): void {
  const numThreats = Math.min(2 + difficulty, 6);
  let placed = 0;

  while (placed < numThreats) {
    const idx = Math.floor(Math.random() * nodes.length);
    const node = nodes[idx];

    if (!node.threat && !node.start && !node.target) {
      node.threat = true;
      placed += 1;
    }
  }
}

export function generateGraph(difficulty: number): NetGraph {
  for (let attempt = 0; attempt < 200; attempt += 1) {
    const nodes = buildBaseNodes();
    applyThreats(nodes, difficulty);
    const edges = buildEdges(nodes);

    if (hasSafePath(nodes, edges)) {
      return { nodes, edges };
    }
  }

  const nodes = buildBaseNodes();
  const edges = buildEdges(nodes);
  return { nodes, edges };
}

export function areConnected(edges: Edge[], aId: number, bId: number): boolean {
  return edges.some(
    ({ a, b }) => (a === aId && b === bId) || (a === bId && b === aId)
  );
}

export function getClickedNode(
  nodes: NetNode[],
  x: number,
  y: number,
  radius: number,
  currentId: number
): NetNode | null {
  for (const node of nodes) {
    const dx = node.x - x;
    const dy = node.y - y;

    if (dx * dx + dy * dy < radius * radius * 2.5 && node.id !== currentId) {
      return node;
    }
  }

  return null;
}