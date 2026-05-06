import { useEffect, useRef } from "react";
import { INITIAL_MOUSE_POSITION, type HomePalette } from "./homePage-model";
import { createEdges, createNodes, createPacket } from "./homePage-utils";
import {
  drawEdges,
  drawGrid,
  drawMousePulse,
  drawNodes,
  getClosestNode,
  getThreatNodeIds,
  syncTooltip,
  updateAndDrawPackets,
  updateNodes,
} from "./homePage-canvas-utills";
import type { Edge, NetworkNode, Packet } from "./homePage-model";

interface HomeHeroCanvasProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
  tooltipRef: React.RefObject<HTMLDivElement | null>;
  palette: HomePalette;
}

export default function HomeHeroCanvas({
  heroRef,
  tooltipRef,
  palette,
}: HomeHeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ ...INITIAL_MOUSE_POSITION });
  const frame = useRef(0);
  const nodes = useRef<NetworkNode[]>([]);
  const edges = useRef<Edge[]>([]);
  const packets = useRef<Packet[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const paletteRef = useRef(palette);

  useEffect(() => {
    paletteRef.current = palette;
  }, [palette]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;

    if (!canvas || !hero) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const ctx = context;

    function initializeScene(width: number, height: number) {
      const nextNodes = createNodes(width, height);
      const nextEdges = createEdges(nextNodes);

      nodes.current = nextNodes;
      edges.current = nextEdges;
      packets.current = [];

      for (let i = 0; i < 12; i += 1) {
        const packet = createPacket(nextEdges);
        if (packet) {
          packets.current.push(packet);
        }
      }
    }

    function resize() {
      const currentCanvas = canvasRef.current;
      const currentHero = heroRef.current;

      if (!currentCanvas || !currentHero) return;

      currentCanvas.width = currentHero.offsetWidth;
      currentCanvas.height = currentHero.offsetHeight;
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      initializeScene(currentCanvas.width, currentCanvas.height);
    }

    function render() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;

      const width = currentCanvas.width;
      const height = currentCanvas.height;
      const currentPalette = paletteRef.current;

      frame.current += 1;

      ctx.clearRect(0, 0, width, height);

      drawGrid(ctx, width, height, currentPalette);
      updateNodes(nodes.current, mouse.current, width, height);

      const threatNodeIds = getThreatNodeIds(nodes.current, mouse.current);

      drawEdges(ctx, edges.current, nodes.current, threatNodeIds, currentPalette);

      if (frame.current % 90 === 0 && packets.current.length < 20) {
        const packet = createPacket(edges.current);
        if (packet) {
          packets.current.push(packet);
        }
      }

      updateAndDrawPackets(ctx, packets.current, nodes.current);
      drawMousePulse(ctx, mouse.current, frame.current, currentPalette);

      const hoveredNode = getClosestNode(nodes.current, mouse.current);

      drawNodes(ctx, nodes.current, hoveredNode, frame.current, currentPalette);
      syncTooltip(tooltipRef.current, hoveredNode, mouse.current);

      animationFrameRef.current = requestAnimationFrame(render);
    }

    function handleMouseMove(event: MouseEvent) {
      const currentHero = heroRef.current;
      if (!currentHero) return;

      const rect = currentHero.getBoundingClientRect();

      mouse.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }

    function handleMouseLeave() {
      mouse.current = { ...INITIAL_MOUSE_POSITION };
      syncTooltip(tooltipRef.current, null, mouse.current);
    }

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });

    resizeObserver.observe(hero);

    animationFrameRef.current = requestAnimationFrame(render);

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      resizeObserver.disconnect();
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [heroRef, tooltipRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        display: "block",
      }}
    />
  );
}