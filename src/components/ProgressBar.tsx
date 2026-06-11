export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div className="progress-wrap">
      {label && <div className="progress-meta"><span>{label}</span><strong>{value}%</strong></div>}
      <div className="progress-track"><span style={{ width: `${value}%` }} /></div>
    </div>
  );
}
