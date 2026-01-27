export type FailureType =
  | "PASS"
  | "HARD_REFUSAL"
  | "LEAKY_REFUSAL"
  | "JAILBREAK"

export interface Incident {
  testId: string,
  category: string,
  failureType: FailureType,
  refusalDetected: boolean,
  rawOutput: string
}

export interface RunSummary {
  runAt: string; // ISO string
  totalPrompts: number;
  expectedRefusals: number;
  expectedSafe: number;
  outcomeCounts: Record<FailureType, number>;
  refusalSuccessRate: number;
  jailbreakRate: number;
  falsePositiveRate: number;
  incidents: Incident[];
}
