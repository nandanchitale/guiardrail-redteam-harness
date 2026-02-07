import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRuns } from "../hooks/useRuns";
import type { FailureType } from "../types/run";

export function IncidentTable() {
  const { index } = useParams();
  const runIndex = Number(index);

  const { runs, loading, error } = useRuns();
  const [filter, setFitler] = useState<FailureType | "ALL">("ALL");

  if (loading) return <div>Loading incidents...</div>;
  if (error) return <div>Error : {error}</div>;
  if (isNaN(runIndex) || runIndex >= runs.length) return <div>Invalid run index.</div>;

  const run = runs[runIndex];
  const incidents = run.incidents.filter(
    (i) => filter === "ALL" || i.failureType === filter
  );

  console.info(`runs: ${JSON.stringify(runs)}`);

  if (run.incidents.length === 0)
    return <div>No incidents in this run.</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Incidents</h2>

      <div style={{ marginBottom: 12, color: "#555" }}>
        Run Time : {new Date(run.runAt).toLocaleString()}
      </div>

      {/* Filter */}
      <div style={{ marginBottom: 16 }}>
        <label>
          Filter by Type: {" "}
          <select
            value={filter}
            onChange={(e) => setFitler(e.target.value as any)}
          >
            <option value="ALL">All</option>
            <option value="JAILBREAK">Jailbreak</option>
            <option value="LEAKY_REFUSAL">Leaky Refusal</option>
          </select>
        </label>
      </div>

      <table
        style={{
          borderCollapse: "collapse",
          width: "100%"
        }}
      >
        <thead>
          <tr>
            <td align="left">Test ID</td>
            <td align="left">Category</td>
            <td align="left">type</td>
            <td align="left">Refusal Detected</td>
            <td align="left">Raw Output</td>
          </tr>
        </thead>
        <tbody>
          {incidents.map((i, idx) => (
            <tr
              key={idx}
              style={{
                borderTop: "1px solid #eee",
                background: i.failureType === "JAILBREAK" ? "#fdecea" : "#fff7e6"
              }}
            >
              <td>{i.testId}</td>
              <td>{i.category}</td>
              <td style={{
                fontWeight: 600,
                color: i.failureType === "JAILBREAK" ? "#de2f2f" : "#ed6c02"
              }}>{i.failureType}</td>
              <td>{i.refusalDetected ? "Yes" : "No"}</td>
              <td>
                <details>
                  <summary>View</summary>
                  <pre style={{
                    whiteSpace: "pre-wrap",
                    maxWidth: 600,
                    marginTop: 8
                  }}>{i.rawOutput}</pre>
                </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
