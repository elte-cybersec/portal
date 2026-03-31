import  { useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import {Button } from "@mui/material";

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  label: string;
  alpha: number;
  pulseOffset: number;
  threat: boolean;
  id: number;
}

interface Edge {
  a: number;
  b: number;
  encrypted: boolean;
}

interface Packet {
  edge: Edge;
  t: number;
  speed: number;
  dir: 1 | -1;
  color: string;
}

const NODE_TYPES = [
  { label: "5G gNB", color: "#1d9e75", size: 9 },
  { label: "UE device", color: "#378add", size: 7 },
  { label: "blockchain node", color: "#7f77dd", size: 8 },
  { label: "firewall", color: "#ba7517", size: 8 },
  { label: "data server", color: "#5a6a8a", size: 6 },
  { label: "IoT sensor", color: "#378add", size: 5 },
  { label: "C-Plane", color: "#1d9e75", size: 10 },
  { label: "U-Plane", color: "#1d9e75", size: 8 },
  { label: "encrypted tunnel", color: "#7f77dd", size: 6 },
  { label: "threat actor", color: "#a32d2d", size: 7 },
] as const;

const THEME = {
  bg: "#0a0e1a",
  green: "#1d9e75",
  greenDark: "#0f6e56",
  greenBorder: "#1d4030",
  blue: "#378add",
  purple: "#7f77dd",
  red: "#a32d2d",
  textPrimary: "#e8eaf0",
  textMuted: "#5a6a8a",
  textDim: "#3a4a6a",
};

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const frame = useRef(0);
  const nodes = useRef<NetworkNode[]>([]);
  const edges = useRef<Edge[]>([]);
  const packets = useRef<Packet[]>([]);
  const animRef = useRef<number | null>(null);
  const hoveredNode = useRef<NetworkNode | null>(null);

  function initNodes(width: number, height: number) {
    const count = Math.min(30, Math.max(12, Math.floor((width * height) / 8000)));
    const ns: NetworkNode[] = [];

    for (let i = 0; i < count; i += 1) {
      const t = NODE_TYPES[Math.floor(Math.random() * NODE_TYPES.length)];
      ns.push({
        x: 60 + Math.random() * Math.max(1, width - 120),
        y: 60 + Math.random() * Math.max(1, height - 120),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: t.size,
        color: t.color,
        label: t.label,
        threat: t.label === "threat actor",
        alpha: 0.7 + Math.random() * 0.3,
        pulseOffset: Math.random() * Math.PI * 2,
        id: i,
      });
    }

    const es: Edge[] = [];
    for (let i = 0; i < ns.length; i += 1) {
      for (let j = i + 1; j < ns.length; j += 1) {
        const dx = ns[i].x - ns[j].x;
        const dy = ns[i].y - ns[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 180 && Math.random() < 0.35) {
          es.push({ a: i, b: j, encrypted: Math.random() < 0.4 });
        }
      }
    }

    nodes.current = ns;
    edges.current = es;
    packets.current = [];

    for (let k = 0; k < 12; k += 1) {
      spawnPacket(es);
    }
  }

  function spawnPacket(es: Edge[]) {
    if (es.length === 0) return;

    const e = es[Math.floor(Math.random() * es.length)];
    packets.current.push({
      edge: e,
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      dir: Math.random() < 0.5 ? 1 : -1,
      color: e.encrypted ? "#7f77dd" : "#1d9e75",
    });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;

    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize(context: CanvasRenderingContext2D) {
      const currentCanvas = canvasRef.current;
      const currentHero = heroRef.current;

      if (!currentCanvas || !currentHero) return;

      currentCanvas.width = currentHero.offsetWidth;
      currentCanvas.height = currentHero.offsetHeight;
      initNodes(currentCanvas.width, currentCanvas.height);
      context.setTransform(1, 0, 0, 1, 0, 0);
    }

    function drawGrid(context: CanvasRenderingContext2D, width: number, height: number) {
      context.save();
      context.strokeStyle = "rgba(29,158,117,0.04)";
      context.lineWidth = 0.5;

      const gs = 60;
      for (let x = 0; x < width; x += gs) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let y = 0; y < height; y += gs) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      context.restore();
    }

    function loop(context: CanvasRenderingContext2D) {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;

      const width = currentCanvas.width;
      const height = currentCanvas.height;

      frame.current += 1;
      context.clearRect(0, 0, width, height);

      drawGrid(context, width, height);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      nodes.current.forEach((node) => {
        const dx = node.x - mx;
        const dy = node.y - my;
        const d2 = dx * dx + dy * dy;

        if (d2 < 8000) {
          const f = ((8000 - d2) / 8000) * 1.5;
          const dist = Math.sqrt(d2) || 1;
          node.vx += (dx / dist) * f * 0.05;
          node.vy += (dy / dist) * f * 0.05;
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

      const threatNodes = new Set<number>();
      nodes.current.forEach((node) => {
        const dx = node.x - mx;
        const dy = node.y - my;
        if (dx * dx + dy * dy < 12000) {
          threatNodes.add(node.id);
        }
      });

      edges.current.forEach((edge) => {
        const a = nodes.current[edge.a];
        const b = nodes.current[edge.b];
        if (!a || !b) return;

        const near = threatNodes.has(edge.a) || threatNodes.has(edge.b);
        const alpha = near ? 0.5 : edge.encrypted ? 0.25 : 0.12;

        context.save();
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.strokeStyle = near
          ? `rgba(163,45,45,${alpha})`
          : edge.encrypted
            ? `rgba(127,119,221,${alpha})`
            : `rgba(29,158,117,${alpha})`;
        context.lineWidth = edge.encrypted ? 1 : 0.5;
        if (edge.encrypted) {
          context.setLineDash([4, 6]);
        } else {
          context.setLineDash([]);
        }
        context.stroke();
        context.restore();
      });

      if (frame.current % 90 === 0 && packets.current.length < 20) {
        spawnPacket(edges.current);
      }

      packets.current.forEach((packet) => {
        packet.t += packet.speed * packet.dir;

        if (packet.t > 1 || packet.t < 0) {
          packet.dir = (packet.dir * -1) as 1 | -1;
          packet.t = Math.max(0, Math.min(1, packet.t));
        }

        const a = nodes.current[packet.edge.a];
        const b = nodes.current[packet.edge.b];
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

      if (mx > 0) {
        context.beginPath();
        context.arc(mx, my, 40 + Math.sin(frame.current * 0.08) * 5, 0, Math.PI * 2);
        context.strokeStyle = "rgba(163,45,45,0.2)";
        context.lineWidth = 0.5;
        context.setLineDash([3, 6]);
        context.stroke();
        context.setLineDash([]);

        context.beginPath();
        context.arc(mx, my, 4, 0, Math.PI * 2);
        context.fillStyle = "rgba(163,45,45,0.5)";
        context.fill();
      }

      let closestNode: NetworkNode | null = null;
      let minD2 = 900;

      for (const node of nodes.current) {
        const dx = node.x - mx;
        const dy = node.y - my;
        const d2 = dx * dx + dy * dy;

        if (d2 < minD2) {
          minD2 = d2;
          closestNode = node;
        }
      }

      hoveredNode.current = closestNode;

      nodes.current.forEach((node) => {
        const pulse = Math.sin(frame.current * 0.04 + node.pulseOffset) * 0.3 + 0.7;
        const hovered = node === hoveredNode.current;
        const radius = node.size * (hovered ? 1.4 : 1);

        if (node.threat) {
          context.beginPath();
          context.arc(node.x, node.y, radius * 2.5, 0, Math.PI * 2);
          context.strokeStyle = `rgba(163,45,45,${0.2 * pulse})`;
          context.lineWidth = 1;
          context.stroke();
        }

        if (hovered) {
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

      const tooltip = tooltipRef.current;
      const hovered: NetworkNode | null = hoveredNode.current;

      if (tooltip) {
        if (hovered && mx > 0) {
          tooltip.style.display = "block";
          tooltip.style.left = `${mx + 14}px`;
          tooltip.style.top = `${my - 10}px`;
          tooltip.textContent = `> ${hovered.label}`;
        } else {
          tooltip.style.display = "none";
        }
      }

      animRef.current = requestAnimationFrame(() => loop(context));
    }

    resize(ctx);

    const ro = new ResizeObserver(() => {
      resize(ctx);
    });
    ro.observe(hero);

    animRef.current = requestAnimationFrame(() => loop(ctx));

    function onMouseMove(e: MouseEvent) {
      const currentHero = heroRef.current;
      if (!currentHero) return;

      const rect = currentHero.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function onMouseLeave() {
      mouse.current = { x: -999, y: -999 };
      if (tooltipRef.current) {
        tooltipRef.current.style.display = "none";
      }
    }

    hero.addEventListener("mousemove", onMouseMove);
    hero.addEventListener("mouseleave", onMouseLeave);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      ro.disconnect();
      hero.removeEventListener("mousemove", onMouseMove);
      hero.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      style={{
        position: "relative",
        width: "100%",
        height: 520,
        background: THEME.bg,
        borderRadius: 12,
        overflow: "hidden",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, display: "block" }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          gap: 12,
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "3px",
            color: THEME.green,
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          ELTE Cybersecurity Lab
        </div>

        <h1
          style={{
            fontSize: "clamp(1.4rem, 4vw, 2.4rem)",
            fontWeight: 500,
            color: THEME.textPrimary,
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Securing the <span style={{ color: THEME.green }}>Connected World</span>
        </h1>

        <p
          style={{
            fontSize: 13,
            color: THEME.textMuted,
            maxWidth: 360,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Research in encryption, 5G trust, blockchain security, and network
          threat management.
        </p>

        <div style={{ display: "flex", gap: 20, marginTop: 4 }}>
          {[
            { dot: THEME.green, label: "32 nodes secured" },
            { dot: "#ba7517", label: "3 threats detected" },
            { dot: THEME.red, label: "1 breach blocked" },
          ].map(({ dot, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: dot,
                  boxShadow: `0 0 4px ${dot}`,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: THEME.textDim,
                  fontFamily: "monospace",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 4,
            pointerEvents: "all",
          }}
        >
          <Button
            component={RouterLink}
            to="/games"
            sx={{
              backgroundColor: THEME.green,
              color: THEME.textPrimary,
              border: "none",
              px: 3,
              py: 1.1,
              borderRadius: 2,
              fontSize: 13,
              fontFamily: "inherit",
              textTransform: "none",
              "&:hover": {
                backgroundColor: THEME.greenDark,
              },
            }}
          >
            Try Security Gauntlet
          </Button>

        </div>
      </div>

      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          padding: "6px 10px",
          background: "#0d1525",
          border: `0.5px solid ${THEME.greenBorder}`,
          borderRadius: 8,
          fontSize: 11,
          color: "#9ecfb8",
          pointerEvents: "none",
          display: "none",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
        }}
      />
    </div>

    
  );
}