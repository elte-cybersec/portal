import commonEnglishWords from "../../../../../../data/commonEnglishWords";

export interface CaesarCandidate {
  output: string;
  key: number;
  score: number; // percentage 0..100
  matchedWords: string[];
  matchedCount: number;
  totalWords: number;
}

function isLetter(char: string): boolean {
  return /^[a-zA-Z]$/.test(char);
}

function normalizeShift(shift: number): number {
  return ((shift % 26) + 26) % 26;
}

function shiftCharacter(char: string, shift: number): string {
  if (!isLetter(char)) {
    return char;
  }

  const base = char >= "a" && char <= "z" ? 97 : 65;
  const normalized = normalizeShift(shift);
  const code = char.charCodeAt(0) - base;

  return String.fromCharCode(((code + normalized) % 26) + base);
}

export function encryptCaesar(text: string, shift: number): string {
  return text
    .split("")
    .map((char) => shiftCharacter(char, shift))
    .join("");
}

export function decryptCaesar(text: string, shift: number): string {
  return encryptCaesar(text, -shift);
}

export function getRandomCaesarShift(): number {
  return Math.floor(Math.random() * 25) + 1;
}

function tokenizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((word) => word.length >= 2);
}

export function scoreEnglishWords(text: string): {
  score: number;
  matchedWords: string[];
  matchedCount: number;
  totalWords: number;
} {
  const words = tokenizeWords(text);

  if (words.length === 0) {
    return {
      score: 0,
      matchedWords: [],
      matchedCount: 0,
      totalWords: 0,
    };
  }

  const matchedWords = words.filter((word) => commonEnglishWords.includes(word));
  const uniqueMatchedWords = Array.from(new Set(matchedWords));
  const matchedCount = matchedWords.length;
  const totalWords = words.length;
  const score = (matchedCount / totalWords) * 100;

  return {
    score,
    matchedWords: uniqueMatchedWords,
    matchedCount,
    totalWords,
  };
}

export function buildCaesarCandidate(output: string, key: number): CaesarCandidate {
  const { score, matchedWords, matchedCount, totalWords } = scoreEnglishWords(output);

  return {
    output,
    key,
    score,
    matchedWords,
    matchedCount,
    totalWords,
  };
}

export function bruteForceCaesar(text: string): CaesarCandidate[] {
  const candidates: CaesarCandidate[] = [];

  for (let shift = 1; shift <= 25; shift += 1) {
    const output = decryptCaesar(text, shift);
    candidates.push(buildCaesarCandidate(output, shift));
  }

  return candidates.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    if (b.matchedCount !== a.matchedCount) {
      return b.matchedCount - a.matchedCount;
    }

    return a.key - b.key;
  });
}

export function bestCaesarCandidate(text: string): CaesarCandidate {
  const candidates = bruteForceCaesar(text);

  return (
    candidates[0] ?? {
      output: text,
      key: 0,
      score: 0,
      matchedWords: [],
      matchedCount: 0,
      totalWords: 0,
    }
  );
}