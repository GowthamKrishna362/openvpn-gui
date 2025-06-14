import "./logDisplay.css";

type LogDispayProps = { logs: string | null };

export default function LogDisplay({ logs }: LogDispayProps) {
  return (
    <div className="log-display-container">
      <div className="log-display-header"> Logs </div>
      <div className="log-display">{logs}</div>
    </div>
  );
}
