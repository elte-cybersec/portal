export interface NetNode {
  id: number;
  x: number;
  y: number;
  threat: boolean;
  start: boolean;
  target: boolean;
}

export interface Edge {
  a: number;
  b: number;
}

export interface NetGraph {
  nodes: NetNode[];
  edges: Edge[];
}

export const W = 460;
export const H = 280;
export const ROUND_TIME = 22;
export const ROUNDS = 5;
export const NODE_R = 13;