import type { RunSummary } from "../types/run";

export interface MetricDelta {
  current: number;
  previous: number;
  delta: number;
  status: "improved" | "regressed" | "unchanged";
}

export interface RunComparision {
  jailbreak: MetricDelta;
  refusalSuccess: MetricDelta;
  falsePositive: MetricDelta;
}

function compareHigherIsWorse(
  current: number,
  previous: number
): MetricDelta {
  const delta = current - previous;
  return {
    current,
    previous,
    delta,
    status: delta > 0 ? "regressed" : delta < 0 ? "improved" : "unchanged",
  };
}

function compareLowerIsWorse(
  current: number,
  previous: number
): MetricDelta {
  const delta = current - previous;
  return {
    current,
    previous,
    delta,
    status: delta < 0 ? "regressed" : delta > 0 ? "improved" : "unchanged"
  };
}

export function compareRuns(
  current: RunSummary,
  previous: RunSummary
): RunComparision {
  return {
    jailbreak: compareHigherIsWorse(current.jailBreakRate, previous.jailBreakRate),
    falsePositive: compareHigherIsWorse(current.falsePositiveRate, previous.falsePositiveRate),
    refusalSuccess: compareLowerIsWorse(current.refusalSuccessRate, previous.refusalSuccessRate)
  };
}
