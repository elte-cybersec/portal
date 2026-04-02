// import { HOME_THEME } from "./homePage-model";
import type { Edge, MousePosition, NetworkNode, Packet } from "./homePage-model";

export function drawGrid(
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  context.save();
  context.strokeStyle = "rgba(29,158,117,0.04)";
  context.lineWidth = 0.5;

  const gridSize = 60;

  for (let x = 0; x < width; x += gridSize) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = 0; y < height; y += gridSize) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  context.restore();
}

export function updateNodes(
  nodes: NetworkNode[],
  mouse: MousePosition,
  width: number,
  height: number
) {
  nodes.forEach((node) => {
    const dx = node.x - mouse.x;
    const dy = node.y - mouse.y;
    const d2 = dx * dx + dy * dy;

    if (d2 < 8000) {
      const force = ((8000 - d2) / 8000) * 1.5;
      const dist = Math.sqrt(d2) || 1;
      node.vx += (dx / dist) * force * 0.05;
      node.vy += (dy / dist) * force * 0.05;
    }

    node.vx *= 0.97;
    node.vy *= 0.97;
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < 20) {
      node.x = 20;
      node.vx *= -1;
    }
    if (node.x > width - 20) {
      node.x = width - 20;
      node.vx *= -1;
    }
    if (node.y < 20) {
      node.y = 20;
      node.vy *= -1;
    }
    if (node.y > height - 20) {
      node.y = height - 20;
      node.vy *= -1;
    }
  });
}

export function getThreatNodeIds(nodes: NetworkNode[], mouse: MousePosition): Set<number> {
  const threatNodes = new Set<number>();

  nodes.forEach((node) => {
    const dx = node.x - mouse.x;
    const dy = node.y - mouse.y;

    if (dx * dx + dy * dy < 12000) {
      threatNodes.add(node.id);
    }
  });

  return threatNodes;
}

export function drawEdges(
  context: CanvasRenderingContext2D,
  edges: Edge[],
  nodes: NetworkNode[],
  threatNodeIds: Set<number>
) {
  edges.forEach((edge) => {
    const a = nodes[edge.a];
    const b = nodes[edge.b];
    if (!a || !b) return;

    const nearThreat = threatNodeIds.has(edge.a) || threatNodeIds.has(edge.b);
    const alpha = nearThreat ? 0.5 : edge.encrypted ? 0.25 : 0.12;

    context.save();
    context.beginPath();
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);

    context.strokeStyle = nearThreat
      ? `rgba(163,45,45,${alpha})`
      : edge.encrypted
        ? `rgba(127,119,221,${alpha})`
        : `rgba(29,158,117,${alpha})`;

    context.lineWidth = edge.encrypted ? 1 : 0.5;
    context.setLineDash(edge.encrypted ? [4, 6] : []);
    context.stroke();
    context.restore();
  });
}

export function updateAndDrawPackets(
  context: CanvasRenderingContext2D,
  packets: Packet[],
  nodes: NetworkNode[]
) {
  packets.forEach((packet) => {
    packet.t += packet.speed * packet.dir;

    if (packet.t > 1 || packet.t < 0) {
      packet.dir = (packet.dir * -1) as 1 | -1;
      packet.t = Math.max(0, Math.min(1, packet.t));
    }

    const a = nodes[packet.edge.a];
    const b = nodes[packet.edge.b];
    if (!a || !b) return;

    const px = a.x + (b.x - a.x) * packet.t;
    const py = a.y + (b.y - a.y) * packet.t;

    context.beginPath();
    context.arc(px, py, 2.5, 0, Math.PI * 2);
    context.fillStyle = packet.color;
    context.globalAlpha = 0.9;
    context.fill();
    context.globalAlpha = 1;
  });
}

export function drawMousePulse(
  context: CanvasRenderingContext2D,
  mouse: MousePosition,
  frame: number
) {
  if (mouse.x <= 0) return;

  context.beginPath();
  context.arc(
    mouse.x,
    mouse.y,
    40 + Math.sin(frame * 0.08) * 5,
    0,
    Math.PI * 2
  );
  context.strokeStyle = "rgba(163,45,45,0.2)";
  context.lineWidth = 0.5;
  context.setLineDash([3, 6]);
  context.stroke();
  context.setLineDash([]);

  context.beginPath();
  context.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
  context.fillStyle = "rgba(163,45,45,0.5)";
  context.fill();
}

export function getClosestNode(
  nodes: NetworkNode[],
  mouse: MousePosition
): NetworkNode | null {
  let closestNode: NetworkNode | null = null;
  let minDistanceSquared = 900;

  for (const node of nodes) {
    const dx = node.x - mouse.x;
    const dy = node.y - mouse.y;
    const distanceSquared = dx * dx + dy * dy;

    if (distanceSquared < minDistanceSquared) {
      minDistanceSquared = distanceSquared;
      closestNode = node;
    }
  }

  return closestNode;
}

export function drawNodes(
  context: CanvasRenderingContext2D,
  nodes: NetworkNode[],
  hoveredNode: NetworkNode | null,
  frame: number
) {
  nodes.forEach((node) => {
    const pulse = Math.sin(frame * 0.04 + node.pulseOffset) * 0.3 + 0.7;
    const isHovered = node === hoveredNode;
    const radius = node.size * (isHovered ? 1.4 : 1);

    if (node.threat) {
      context.beginPath();
      context.arc(node.x, node.y, radius * 2.5, 0, Math.PI * 2);
      context.strokeStyle = `rgba(163,45,45,${0.2 * pulse})`;
      context.lineWidth = 1;
      context.stroke();
    }

    if (isHovered) {
      context.beginPath();
      context.arc(node.x, node.y, radius * 2, 0, Math.PI * 2);
      context.fillStyle = `${node.color}22`;
      context.fill();
    }

    context.beginPath();
    context.arc(node.x, node.y, radius, 0, Math.PI * 2);
    context.fillStyle = node.color;
    context.globalAlpha = node.alpha * pulse;
    context.fill();
    context.globalAlpha = 1;

    if (node.threat || node.label === "C-Plane" || node.label === "blockchain node") {
      context.beginPath();
      context.arc(node.x, node.y, radius + 2, 0, Math.PI * 2);
      context.strokeStyle = `${node.color}88`;
      context.lineWidth = 0.5;
      context.stroke();
    }
  });
}

export function syncTooltip(
  tooltip: HTMLDivElement | null,
  hoveredNode: NetworkNode | null,
  mouse: MousePosition
) {
  if (!tooltip) return;

  if (hoveredNode && mouse.x > 0) {
    tooltip.style.display = "block";
    tooltip.style.left = `${mouse.x + 14}px`;
    tooltip.style.top = `${mouse.y - 10}px`;
    tooltip.textContent = `> ${hoveredNode.label}`;
    return;
  }

  tooltip.style.display = "none";
}