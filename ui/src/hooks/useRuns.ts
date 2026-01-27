import { useEffect, useState } from "react";
import { fetchRuns } from "../api/runsApi";
import type { RunSummary } from "../types/run";

export function useRuns() {
  const [runs, setRuns] = useState<RunSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRuns()
      .then(setRuns)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return {
    runs,
    loading,
    error
  }
}
