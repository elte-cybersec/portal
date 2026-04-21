export const HEX_SIZE = 54;
export const HEX_W = HEX_SIZE * 2;
export const HEX_H = HEX_SIZE * Math.sqrt(3);

export function hexPoints(cx: number, cy: number, size = HEX_SIZE): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = cx + size * Math.cos(angle);
    const y = cy + size * Math.sin(angle);
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return pts.join(" ");
}

export function honeycombCoords(count: number): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = [];
  if (count <= 0) return out;

  const dirs: [number, number][] = [
    [HEX_W * 0.75, HEX_H * 0.5],
    [0, HEX_H],
    [-HEX_W * 0.75, HEX_H * 0.5],
    [-HEX_W * 0.75, -HEX_H * 0.5],
    [0, -HEX_H],
    [HEX_W * 0.75, -HEX_H * 0.5],
  ];

  let ring = 1;
  while (out.length < count) {
    let x = 0;
    let y = -HEX_H * ring;
    for (let side = 0; side < 6; side++) {
      for (let step = 0; step < ring; step++) {
        out.push({ x, y });
        if (out.length >= count) return out;
        x += dirs[side][0];
        y += dirs[side][1];
      }
    }
    ring++;
  }
  return out;
}

export function computeViewBox(count: number, pad = HEX_SIZE + 20) {
  const coords = count > 0 ? honeycombCoords(count) : [];
  const xs = [...coords.map((c) => c.x), 0];
  const ys = [...coords.map((c) => c.y), 0];
  const minX = Math.min(...xs) - pad;
  const maxX = Math.max(...xs) + pad;
  const minY = Math.min(...ys) - pad;
  const maxY = Math.max(...ys) + pad;
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

export const ANIMATION_SPEEDS = {
  slow: 520,
  normal: 240,
  fast: 100,
} as const;

export type AnimationSpeed = keyof typeof ANIMATION_SPEEDS;