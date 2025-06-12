import { useEffect, useState } from "react";
import Header from "./components/Header/";
import SessionTable from "./components/SessionTable";
import LogDisplay from "./components/LogDisplay";

import "./app.css";

export default function App() {
  const [tableLoader, setTableLoader] = useState<boolean>(false);
  const [isSessionStarting, setIsSessionStarting] = useState<boolean>(false);

  const [sessions, setSessions] = useState<OpenVPNSession[]>([]);
  const [ovpnFilePath, setOvpnFilePath] = useState<string | null>(null);
  const [logs, setLogs] = useState<string | null>(null);

  const handleError = (e: unknown) => {
    if (e instanceof Error) {
      setLogs(e.message);
    } else {
      setLogs("Unknown error");
    }
  };

  const fetchSessions = async (showLoader = false) => {
    try {
      if (showLoader) {
        setTableLoader(true);
      }
      const result = await window.electron.getSessionsList();
      setSessions(result);
    } catch (e) {
      handleError(e);
    } finally {
      setTableLoader(false);
    }
  };

  useEffect(() => {
    fetchSessions(true);
    setInterval(() => {
      fetchSessions();
    }, 5000);
  }, []);

  const manageSession = async (
    sessionPath: string,
    type: sessionManagementAction,
  ) => {
    try {
      const res = await window.electron.manageSession({ sessionPath, type });
      setLogs(res);
    } catch (e) {
      handleError(e);
    } finally {
      fetchSessions(true);
    }
  };

  const startSession = async () => {
    if (!ovpnFilePath) {
      return;
    }
    try {
      setIsSessionStarting(true);
      const res = await window.electron.startSession({
        filePath: ovpnFilePath,
      });
      setLogs(res);
    } catch (e) {
      handleError(e);
    } finally {
      setIsSessionStarting(false);
      fetchSessions(true);
    }
  };

  const selectOvpnFile = async () => {
    const fileName = await window.electron.selectOvpnFile();
    setOvpnFilePath(fileName);
  };

  return (
    <div className="container">
      <Header
        fetchSessions={fetchSessions}
        selectOvpnFile={selectOvpnFile}
        selectedFileName={
          ovpnFilePath?.split(/[\\/]/).pop() || "No files selected"
        }
        noFileSelected={!ovpnFilePath}
        startSession={startSession}
        isStarting={isSessionStarting}
      />
      <div className="content-display">
        <SessionTable
          isLoading={tableLoader}
          manageSession={manageSession}
          sessions={sessions}
        />
        <LogDisplay logs={logs} />
      </div>
    </div>
  );
}
