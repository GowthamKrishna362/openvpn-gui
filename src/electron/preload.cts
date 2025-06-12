const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  getSessionsList: () => electron.ipcRenderer.invoke("getSessionsList"),
  pauseSession: (sessionPath: string) => {
    return electron.ipcRenderer.invoke("pauseSession", { sessionPath });
  },
  resumeSession: (sessionPath: string) => {
    return electron.ipcRenderer.invoke("resumeSession", { sessionPath });
  },
});
