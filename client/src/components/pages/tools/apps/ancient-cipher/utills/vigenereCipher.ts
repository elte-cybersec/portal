import { bestCaesarCandidate } from "./caesarCipher";

export interface VigenereGuessResult {
  output: string;
  key: number[];
  guessedKeyLength: number;
}

const RANDOM_VIGENERE_WORD_KEYS = [
  "sun",
  "moon",
  "star",
  "light",
  "cipher",
  "rome",
  "olive",
  "delta",
  "alpha",
  "stone",
  "eagle",
  "guard",
  "logic",
  "shield",
  "signal",
];

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

export function wordKeyToNumericKey(word: string): number[] {
  return word
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("")
    .map((char) => char.charCodeAt(0) - 97)
    .map((value) => normalizeShift(value));
}

export function numericKeyToWordLikeString(key: number[]): string {
  return key.map((value) => String(normalizeShift(value))).join(", ");
}

function sanitizeNumericKey(key: number[]): number[] {
  return key
    .filter((value) => Number.isFinite(value))
    .map((value) => normalizeShift(value));
}

export function encryptVigenere(text: string, key: number[]): string {
  const sanitizedKey = sanitizeNumericKey(key);

  if (sanitizedKey.length === 0) {
    return text;
  }

  let keyIndex = 0;

  return text
    .split("")
    .map((char) => {
      if (!isLetter(char)) {
        return char;
      }

      const shift = sanitizedKey[keyIndex % sanitizedKey.length];
      keyIndex += 1;
      return shiftCharacter(char, shift);
    })
    .join("");
}

export function decryptVigenere(text: string, key: number[]): string {
  const sanitizedKey = sanitizeNumericKey(key);

  if (sanitizedKey.length === 0) {
    return text;
  }

  let keyIndex = 0;

  return text
    .split("")
    .map((char) => {
      if (!isLetter(char)) {
        return char;
      }

      const shift = sanitizedKey[keyIndex % sanitizedKey.length];
      keyIndex += 1;
      return shiftCharacter(char, -shift);
    })
    .join("");
}

export function getRandomVigenereWordKey(): string {
  const index = Math.floor(Math.random() * RANDOM_VIGENERE_WORD_KEYS.length);
  return RANDOM_VIGENERE_WORD_KEYS[index];
}

export function getRandomVigenereNumericKey(): number[] {
  return wordKeyToNumericKey(getRandomVigenereWordKey());
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);

  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }

  return x;
}

function reduceGcd(values: number[]): number {
  if (values.length === 0) {
    return 1;
  }

  return values.reduce((acc, value) => gcd(acc, value));
}

export function repetitionsInString(text: string, fragmentLength = 3): Array<[number, number]> {
  const normalized = text.toLowerCase().replace(/[^a-z]/g, "");
  const pairs: Array<[number, number]> = [];

  for (let i = 0; i <= normalized.length - fragmentLength; i += 1) {
    const fragment = normalized.slice(i, i + fragmentLength);

    for (let j = i + 1; j <= normalized.length - fragmentLength; j += 1) {
      if (fragment === normalized.slice(j, j + fragmentLength)) {
        pairs.push([i, j]);
      }
    }
  }

  return pairs;
}

export function guessVigenereKeyLength(text: string, fragmentLength = 3): number {
  const reps = repetitionsInString(text, fragmentLength);
  const distances = reps.map(([i, j]) => j - i).filter((value) => value > 0);

  if (distances.length === 0) {
    return 1;
  }

  const guess = reduceGcd(distances);
  return guess > 0 ? guess : 1;
}

function extractLetterOnlyGroups(text: string, keyLength: number): string[] {
  const groups = Array.from({ length: keyLength }, () => "");
  let letterIndex = 0;

  for (const char of text) {
    if (!isLetter(char)) {
      continue;
    }

    groups[letterIndex % keyLength] += char.toLowerCase();
    letterIndex += 1;
  }

  return groups;
}

export function guessVigenereNumericKey(text: string, keyLength?: number): number[] {
  const resolvedKeyLength =
    keyLength && keyLength > 0 ? keyLength : guessVigenereKeyLength(text);

  const groups = extractLetterOnlyGroups(text, resolvedKeyLength);

  return groups.map((group) => bestCaesarCandidate(group).key);
}

export function breakVigenere(text: string, keyLength?: number): VigenereGuessResult {
  const key = guessVigenereNumericKey(text, keyLength);
  const output = decryptVigenere(text, key);

  return {
    output,
    key,
    guessedKeyLength: key.length,
  };
}