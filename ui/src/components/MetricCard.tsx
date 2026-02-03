interface MetricCardProps {
  label: string;
  value: string;
  severity?: "good" | "warning" | "bad";
}

export function MetricCard({
  label,
  value,
  severity = "good"
}: MetricCardProps) {
  const color = severity === "bad" ? "#d32f2f" : severity === "warning" ? "#ed6c02" : "2e7d32";

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        minWidth: 180
      }}
    >
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color }}>{value}</div>
    </div>
  );
}
