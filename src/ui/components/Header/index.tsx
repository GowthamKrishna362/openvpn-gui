import "./header.css";

type HeaderProps = {
  selectOvpnFile: () => void;
  fetchSessions: (showLoader?: boolean) => void;
  startSession: () => void;
  selectedFileName: string;
  isStarting: boolean;
  noFileSelected: boolean;
};

export default function Header({
  selectOvpnFile,
  fetchSessions,
  selectedFileName,
  startSession,
  isStarting,
  noFileSelected,
}: HeaderProps) {
  return (
    <div className="header">
      <h1 className="header-title">🛡 OpenVPN GUI</h1>
      <div className="header-toolbar">
        <button onClick={selectOvpnFile}>Select File</button>
        <div className="selected-file">Selected File: {selectedFileName}</div>
        <button
          className="toolbar-btn"
          onClick={startSession}
          disabled={isStarting || noFileSelected}
        >
          {!isStarting ? "Start Session" : "Starting..."}
        </button>
        <button className="toolbar-btn" onClick={() => fetchSessions(true)}>
          Refresh
        </button>
      </div>
    </div>
  );
}
