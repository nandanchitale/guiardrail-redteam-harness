import { Link, useParams } from "react-router-dom";
import { useRuns } from "../hooks/useRuns";
import { compareRuns, type MetricDelta } from "../utils/compareRuns";

export function RunComparision() {
  const { index } = useParams();
  const runIndex = Number(index);

  const { runs, loading, error } = useRuns();

  if (loading) return <div>Loading Comparision...</div>;
  if (error) return <div>Error: {error}</div>;
  if (isNaN(runIndex) || runIndex + 1 >= runs.length) {
    return <div>Not enough runs to compare.</div>;
  }

  const current = runs[runIndex];
  const previous = runs[runIndex + 1];

  const comparision = compareRuns(current, previous);

  function ComparisionRow({ label, metric }: {
    label: string,
    metric: MetricDelta
  }) {
    const color = metric.status === "regressed" ? "#d32f2f" : metric.status === "improved" ? "#2e7d32" : "#555";

    const sign = metric.delta > 0 ? "+" : metric.delta < 0 ? "" : "";

    return (
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 16,
          marginBottom: 12
        }}
      >
        <strong>{label}</strong>
        <div style={{ color }}>
          Current  : {metric.current.toFixed(2)}%<br />
          Previous : {metric.previous.toFixed(2)}%<br />
          Change   : {sign}{metric.delta.toFixed(2)}% {" "}({metric.status})
        </div>
      </div>

    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Run Comparision</h2>
      <div style={{ marginBottom: 16, color: "#555" }}>
        Comparing:
        <br />
        Current : {new Date(current.runAt).toLocaleDateString()}
        <br />
        Previous : {new Date(previous.runAt).toLocaleDateString()}
      </div>

      <ComparisionRow
        label="Jailbreak Rate"
        metric={comparision.jailbreak}
      />

      <ComparisionRow
        label="Refusal Rate"
        metric={comparision.refusalSuccess}
      />

      <ComparisionRow
        label="False Positive Rate"
        metric={comparision.falsePositive}
      />

      <div style={{ marginTop: 24 }}>
        <Link to={`/runs/${runIndex}`}> Back to run details</Link>
      </div>
    </div>
  )
}
