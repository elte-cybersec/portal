export const ROUND_TIME = 20;
export const ROUNDS = 5;

export interface RoundState {
  plain: string;
  encrypted: string;
  answer: number;
}

export type FeedbackType = "ok" | "err" | "none";
export type DecodedStatus = "idle" | "ok" | "err";