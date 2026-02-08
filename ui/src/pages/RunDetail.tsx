import { Link, useParams } from "react-router-dom";
import { useRuns } from "../hooks/useRuns";

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 12,
        minWidth: 160
      }}
    >
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 600 }}>{value}</div>
    </div>
  )
}

export function RunDetail() {
  const { index } = useParams();
  const runIndex = Number(index);

  const { runs, loading, error } = useRuns();

  if (loading) return <div>Loading run...</div>;
  if (error) return <div>Error : {error}</div>;
  if (isNaN(runIndex) || runIndex >= runs.length) return <div>Invalid run index.</div>;

  const run = runs[runIndex]

  console.info(run.outcomeCounts);
  const outcomeEntries = run.outcomeCounts && Object.entries(run.outcomeCounts).length > 0 ? Object.entries(run.outcomeCounts) : [];
  console.info(outcomeEntries);

  return (
    <div style={{ padding: 24 }}>
      <h2>Run Details</h2>

      <div style={{ marginBottom: 12, color: "#555" }}>
        Runtime : {new Date(run.runAt).toLocaleDateString()}
      </div>

      {/* Metrics */}
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 24,
        }}>
        <Metric label="Total Prompts" value={run.totalPrompts} />
        <Metric label="Expected Refusals" value={run.expectedRefusals} />
        <Metric label="Expected Safe" value={run.expectedSafe} />
        <Metric label="Refusal Success %" value={run.refusalSuccessRate} />
        <Metric label="Jailbreak Rate %" value={run.jailBreakRate} />
        <Metric label="False Positive %" value={run.falsePositiveRate.toFixed(2)} />
      </div>

      {/* Outcome breakdown */}
      <h3>Outcome Breakdown</h3>
      {outcomeEntries.length === 0 ? (
        <div style={{ color: "#777", marginBottom: 24 }} >
          No outcome data recorded for this run.
        </div>
      ) : (
        <table
          style={{
            borderCollapse: "collapse",
            marginBottom: 24,
          }}
        >
          <thead>
            <tr>
              <th align="left">Outcome</th>
              <th align="right">Count</th>
            </tr>
          </thead>
          <tbody>
            {outcomeEntries.map(([type, count]) => (
              <tr key={type} style={{ borderTop: "1px solid #eee" }}>
                <td>{type}</td>
                <td align="right">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Incidents */}
      {run.incidents.length === 0 ? (
        <div style={{ color: "#777", marginBottom: 24 }} >
          No incident data recorded for this run.
        </div>
      ) : (<>
        <div style={{ marginBottom: 16 }}>
          <strong>Incidents:</strong>{" "}{run.incidents.length}
        </div>
        <Link to={`/runs/${runIndex}/incidents`}>
          View Incidents :
        </Link>
      </>
      )}

      {/* Previous Run Comparision */}
      <div style={{ marginTop: 16 }}>
        <Link to={`/runs/${runIndex}/compare`}>Compare with Previous runs</Link>
      </div>
    </div>
  );
}

