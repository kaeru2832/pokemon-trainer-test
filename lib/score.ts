export type Pole = "L" | "S" | "T" | "F" | "R" | "C" | "E" | "I" | "A" | "D";

export interface OptionWeights {
  [key: string]: number;
}

export interface ScoreMap {
  L: number; S: number;
  T: number; F: number;
  R: number; C: number;
  E: number; I: number;
  A: number; D: number;
}

export function calculateTypeCode(selectedWeights: OptionWeights[]): string {
  const scores: ScoreMap = { L: 0, S: 0, T: 0, F: 0, R: 0, C: 0, E: 0, I: 0, A: 0, D: 0 };

  for (const weights of selectedWeights) {
    for (const [pole, value] of Object.entries(weights)) {
      if (pole in scores) {
        (scores as unknown as Record<string, number>)[pole] += value;
      }
    }
  }

  // tie-breaker defaults: S, T, C, I, D
  const axis1 = scores.L >= scores.S ? "L" : "S";
  const axis2 = scores.T >= scores.F ? "T" : "F";
  const axis3 = scores.R > scores.C ? "R" : "C";
  const axis4 = scores.E > scores.I ? "E" : "I";
  const axis5 = scores.A > scores.D ? "A" : "D";

  return `${axis1}${axis2}${axis3}${axis4}${axis5}`;
}

export function getRivalCode(code: string): string {
  const opposites: Record<string, string> = {
    L: "S", S: "L", T: "F", F: "T",
    R: "C", C: "R", E: "I", I: "E",
    A: "D", D: "A",
  };
  return code.split("").map((c) => opposites[c] ?? c).join("");
}

export function getMatchCode(code: string): string {
  // Flip axis 1 (L↔S) and axis 4 (E↔I), keep others
  const chars = code.split("");
  const flip: Record<string, string> = { L: "S", S: "L", E: "I", I: "E" };
  chars[0] = flip[chars[0]] ?? chars[0];
  chars[3] = flip[chars[3]] ?? chars[3];
  return chars.join("");
}

export function isValidCode(code: string): boolean {
  if (code.length !== 5) return false;
  const valid = [
    /^[LS]$/, /^[TF]$/, /^[RC]$/, /^[EI]$/, /^[AD]$/
  ];
  return code.split("").every((c, i) => valid[i].test(c));
}
