import { Link } from "react-router-dom";
import { useRuns } from "../hooks/useRuns";

export function RunHistory() {
  const { runs, loading, error } = useRuns();
  if (loading) return <div>Loading runs...</div>;
  if (error) <div>Error loading runs : {error}</div>;
  if (runs.length === 0) return <div>No runs available</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2> Runs History</h2>

      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: 16
        }}
      >
        <thead>
          <tr>
            <th align="left">Run Time</th>
            <th align="right">Prompts</th>
            <th align="right">Jailbreak %</th>
            <th align="right">Refusal %</th>
            <th align="right">False Pos %</th>
          </tr>
        </thead>
        <tbody>
          {
            runs.map((run, index) => (
              <tr
                key={index}
                style={{ borderTop: "1px solid #eee" }}
              >
                <td>
                  <Link to={`/runs/${index}`}>
                    {new Date(run.runAt).toLocaleString()}
                  </Link>
                </td>
                <td align="right">
                  {run.totalPrompts}
                </td>
                <td align="right">
                  {run.refusalSuccessRate.toFixed(2)}
                </td>
                <td align="right">
                  {run.falsePositiveRate.toFixed(2)}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
