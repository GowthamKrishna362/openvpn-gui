import "./logDisplay.css";

type LogDispayProps = { logs: string | null };

export default function LogDisplay({ logs }: LogDispayProps) {
  return <div className="log-display">{logs}</div>;
}
