import "./sessionTable.css";

type SessionTableProps = {
  isLoading: boolean;
  sessions: OpenVPNSession[];
  manageSession: (sessionPath: string, type: sessionManagementAction) => void;
};

export default function SessionTable({
  isLoading,
  sessions,
  manageSession,
}: SessionTableProps) {
  if (isLoading) {
    return <p className="session-loading">Loading...</p>;
  }

  return (
    <div className="session-table">
      <h2 className="table-heading">Active Sessions</h2>
      <ul className="session-list">
        {sessions.map((s: OpenVPNSession) => (
          <li
            key={s.path}
            className={`session-item ${s.path === "0" ? "active" : ""}`}
          >
            <div className="session-info">
              <div className="session-info-title">{s.configName || s.path}</div>
              <div className="session-info-subtitle">
                {s.status} | {s.device || "No Device"} |{" "}
                {s.connectedTo || "Not connected"}
              </div>
            </div>
            <div className="session-actions">
              <button
                className="session-btn"
                onClick={() => manageSession(s.path, "pause")}
              >
                ⏸
              </button>
              <button
                className="session-btn"
                onClick={() => manageSession(s.path, "resume")}
              >
                ▶
              </button>
              <button
                className="session-btn"
                onClick={() => manageSession(s.path, "disconnect")}
              >
                ⛔
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
