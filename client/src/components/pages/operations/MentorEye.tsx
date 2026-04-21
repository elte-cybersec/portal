import { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material";

export default function MentorEye() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const hostRef = useRef<HTMLDivElement>(null);
  const [pupilPos, setPupilPos] = useState({ cx: 50, cy: 50 });
  const [irisPos, setIrisPos] = useState({ cx: 50, cy: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const host = hostRef.current;
      if (!host) return;

      const rect = host.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy) / 100, 1);
      const maxOffset = 6;
      const maxIris = 3;

      setPupilPos({
        cx: 50 + Math.cos(angle) * maxOffset * dist,
        cy: 50 + Math.sin(angle) * maxOffset * dist,
      });
      setIrisPos({
        cx: 50 + Math.cos(angle) * maxIris * dist,
        cy: 50 + Math.sin(angle) * maxIris * dist,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={hostRef} style={{ width: "100%" }}>
      <svg viewBox="0 0 100 100" width="100%" style={{ display: "block" }}>
        <ellipse
          cx={50}
          cy={50}
          rx={36}
          ry={28}
          fill="#072024"
          stroke={primary}
          strokeWidth={1.2}
        />
        <ellipse
          cx={irisPos.cx}
          cy={irisPos.cy}
          rx={12}
          ry={12}
          fill="#0a3a3a"
          stroke={primary}
          strokeWidth={0.8}
          style={{ transition: "cx 0.08s linear, cy 0.08s linear" }}
        />
        <circle
          cx={pupilPos.cx}
          cy={pupilPos.cy}
          r={5}
          fill={primary}
          style={{ transition: "cx 0.08s linear, cy 0.08s linear" }}
        />
        <circle
          cx={pupilPos.cx - 2}
          cy={pupilPos.cy - 2}
          r={1.2}
          fill="#d4e8ea"
          opacity={0.9}
          style={{ transition: "cx 0.08s linear, cy 0.08s linear" }}
        />
      </svg>
    </div>
  );
}