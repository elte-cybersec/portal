import type { RoundState } from "./caesar-game-types";
import commonEnglishWords from "../../../../../../data/commonEnglishWords";

export const CAESAR_WORDS = commonEnglishWords;

export function caesarShift(text: string, shift: number): string {
  return text
    .split("")
    .map((char) => {
      if (char >= "A" && char <= "Z") {
        return String.fromCharCode(
          ((char.charCodeAt(0) - 65 + shift + 26) % 26) + 65
        );
      }

      if (char >= "a" && char <= "z") {
        return String.fromCharCode(
          ((char.charCodeAt(0) - 97 + shift + 26) % 26) + 97
        );
      }

      return char;
    })
    .join("");
}

export function generateRound(words: string[] = CAESAR_WORDS): RoundState {
  const plain = words[Math.floor(Math.random() * words.length)].toLowerCase();
  const answer = Math.floor(Math.random() * 25) + 1;
  const encrypted = caesarShift(plain, answer);

  return {
    plain,
    encrypted,
    answer,
  };
}

export function getNextShift(currentShift: number, delta: number): number {
  return (currentShift + delta + 26) % 26;
}

export function getDecodedText(roundState: RoundState, shift: number): string {
  return caesarShift(roundState.encrypted, -shift);
}

export function isCorrectGuess(roundState: RoundState, shift: number): boolean {
  return getDecodedText(roundState, shift) === roundState.plain;
}

export function calculateRoundScore(timeLeft: number): number {
  return Math.round(50 + timeLeft * 5);
}