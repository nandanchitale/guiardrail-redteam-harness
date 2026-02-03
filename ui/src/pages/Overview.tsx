import { MetricCard } from "../components/MetricCard";
import { useRuns } from "../hooks/useRuns";

export function Overview() {
  const { runs, loading, error } = useRuns();
  if (loading) return <div> Loading latest run ...</div>;
  if (error) return <div> Error loading runs: {error}</div>;
  if (runs.length === 0) return <div>No runs available</div>;

  const latest = runs[0];
  const jailbreakSeverity = latest.jailBreakRate > 0 ? "bad" : "good";
  const refusalSeverity = latest.refusalSuccessRate < 100 ? "warning" : "good";
  const falasePositiveSeverity = latest.falsePositiveRate > 0 ? "warning" : "good";

  console.info(`latest : ${JSON.stringify(latest)}`);

  return (
    <div style={{ padding: 24 }}>
      <h2>Overview</h2>

      <div style={{ marginBottom: 16, color: "#555" }}>
        Last Run: {new Date(latest.runAt).toLocaleString()}
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap"
        }}
      >
        <MetricCard
          label="jailbreak Rate"
          value={`${latest.jailBreakRate} % `}
          severity={jailbreakSeverity}
        />
        <MetricCard
          label="Refusal Success Rate"
          value={`${latest.refusalSuccessRate.toFixed(2)} % `}
          severity={refusalSeverity}
        />
        <MetricCard
          label="False Positive Rate"
          value={`${latest.falsePositiveRate.toFixed(2)} % `}
          severity={falasePositiveSeverity}
        />
        <MetricCard
          label="Total Prompts"
          value={latest.totalPrompts.toString()}
        />

      </div>
    </div>
  );
}
