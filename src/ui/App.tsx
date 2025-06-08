import { useEffect, useState } from "react";
import "./App.css";
import type { OpenVPNSession } from "./types/vpn";

function App() {
  const [count, setCount] = useState(0);

  const [sessionsList, setSessionsList] = useState<OpenVPNSession[]>([]);

  const getSessionsList = async () => {
    const result = await window.electron.getSessionsList();
    setSessionsList(result);
  };

  useEffect(() => {
    getSessionsList();
  }, []);

  console.log(sessionsList, "Sessions List");

  return (
    <>
      {sessionsList.map((session) => {
        return <div>{session.path}</div>;
      })}
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
