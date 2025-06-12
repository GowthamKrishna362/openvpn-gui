// File: App.tsx
import { useEffect, useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState<OpenVPNSession[]>([]);
  const [ovpnFile, setOvpnFile] = useState<File | null>(null);

  const fetchSessions = async (showLoader = false) => {
    try {
      if (showLoader) {
        setIsLoading(true);
      }
      const result = await window.electron.getSessionsList();
      setSessions(result);
    } catch (e) {
      console.error("Failed to fetch sessions:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!ovpnFile) return;
    const filePath = await window.electron.importOvpnFile(ovpnFile.path);
    await fetchSessions();
  };

  const pauseSession = async (sessionPath: string) => {
    await window.electron.pauseSession(sessionPath);
    await fetchSessions(true);
  };

  const resumeSession = async (sessionPath: string) => {
    await window.electron.resumeSession(sessionPath);
    await fetchSessions(true);
  };

  useEffect(() => {
    fetchSessions(true);
    setInterval(() => {
      fetchSessions();
    }, 5000);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "1rem 2rem",
        backgroundColor: "#1e1e1e",
        color: "#e0e0e0",
        fontFamily: "sans-serif",
        boxSizing: "border-box",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <h1 style={{ fontSize: "1.2rem", margin: 0 }}>🛡 OpenVPN GUI</h1>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="file"
            accept=".ovpn"
            onChange={(e) => setOvpnFile(e.target.files?.[0] || null)}
            style={{ color: "#e0e0e0" }}
          />
          <button style={toolbarBtnStyle} onClick={handleFileUpload}>
            Add
          </button>
          <button style={toolbarBtnStyle} onClick={fetchSessions}>
            Refresh
          </button>
        </div>
      </header>

      <main style={{ flexGrow: 1, overflowY: "auto" }}>
        <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          Active Sessions
        </h2>

        {isLoading ? (
          <p style={{ padding: "1rem", color: "#999" }}>Loading...</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {sessions.map((s, i) => (
              <li
                key={i}
                style={{
                  backgroundColor: i === 0 ? "#7e57c2" : "#2e2e2e",
                  marginBottom: "0.5rem",
                  padding: "1rem",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
                    {s.configName || s.path}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#ccc" }}>
                    {s.status} | {s.device || "No Device"} |{" "}
                    {s.connectedTo || "Not connected"}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    style={toolbarBtnStyle}
                    onClick={() => pauseSession(s.path)}
                  >
                    ⏸
                  </button>
                  <button
                    style={toolbarBtnStyle}
                    onClick={() => resumeSession(s.path)}
                  >
                    ▶
                  </button>
                  <button style={toolbarBtnStyle}>⛔</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

const toolbarBtnStyle: React.CSSProperties = {
  backgroundColor: "#2e2e2e",
  color: "#e0e0e0",
  border: "1px solid #444",
  padding: "0.3rem 0.7rem",
  borderRadius: "4px",
  cursor: "pointer",
};
