import type { RunSummary } from "../types/run";

export async function fetchRuns(): Promise<RunSummary[]> {
  const res = await fetch("/api/runs");

  if (!res.ok) {
    throw new Error(`Failed to fetch runs: ${res.status}`);
  }

  return res.json();
}

