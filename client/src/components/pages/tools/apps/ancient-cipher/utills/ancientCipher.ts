import {
  encryptCaesar,
  decryptCaesar,
  getRandomCaesarShift,
  bruteForceCaesar,
  scoreEnglishWords,
} from "./caesarCipher";

import {
  encryptVigenere,
  decryptVigenere,
  wordKeyToNumericKey,
  getRandomVigenereWordKey,
  breakVigenere,
} from "./vigenereCipher";

export type AncientCipherType = "caesar" | "vigenere";

export interface EncryptResult {
  type: AncientCipherType;
  input: string;
  output: string;
  key: string;
}

export interface DecryptCandidate {
  type: AncientCipherType;
  output: string;
  key: string;
  score: number;
  matchedWords: string[];
  matchedCount: number;
  totalWords: number;
}

export function encryptAncient(
  text: string,
  type: AncientCipherType
): EncryptResult {
  if (type === "caesar") {
    const shift = getRandomCaesarShift();

    return {
      type,
      input: text,
      output: encryptCaesar(text, shift),
      key: String(shift),
    };
  }

  const wordKey = getRandomVigenereWordKey();
  const numericKey = wordKeyToNumericKey(wordKey);

  return {
    type,
    input: text,
    output: encryptVigenere(text, numericKey),
    key: wordKey,
  };
}

export function decryptAncient(text: string, key?: string): DecryptCandidate[] {
  const trimmedKey = key?.trim() ?? "";

  if (!trimmedKey) {
    const caesarCandidates = bruteForceCaesar(text).map((candidate) => ({
      type: "caesar" as const,
      output: candidate.output,
      key: String(candidate.key),
      score: candidate.score,
      matchedWords: candidate.matchedWords,
      matchedCount: candidate.matchedCount,
      totalWords: candidate.totalWords,
    }));

    const brokenVigenere = breakVigenere(text);
    const vigenereScore = scoreEnglishWords(brokenVigenere.output);

    const vigenereCandidate: DecryptCandidate = {
      type: "vigenere",
      output: brokenVigenere.output,
      key: brokenVigenere.key.join(", "),
      score: vigenereScore.score,
      matchedWords: vigenereScore.matchedWords,
      matchedCount: vigenereScore.matchedCount,
      totalWords: vigenereScore.totalWords,
    };

    return [...caesarCandidates, vigenereCandidate].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.matchedCount - a.matchedCount;
    });
  }

  if (/^\d+$/.test(trimmedKey)) {
    const shift = Number(trimmedKey);
    const output = decryptCaesar(text, shift);
    const score = scoreEnglishWords(output);

    return [
      {
        type: "caesar",
        output,
        key: trimmedKey,
        score: score.score,
        matchedWords: score.matchedWords,
        matchedCount: score.matchedCount,
        totalWords: score.totalWords,
      },
    ];
  }

  const numericKey = wordKeyToNumericKey(trimmedKey);
  const output = decryptVigenere(text, numericKey);
  const score = scoreEnglishWords(output);

  return [
    {
      type: "vigenere",
      output,
      key: trimmedKey,
      score: score.score,
      matchedWords: score.matchedWords,
      matchedCount: score.matchedCount,
      totalWords: score.totalWords,
    },
  ];
}