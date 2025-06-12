const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  getSessionsList: () => electron.ipcRenderer.invoke("getSessionsList"),
  selectOvpnFile: () => electron.ipcRenderer.invoke("selectOvpnFile"),
  startSession: ({ filePath }: EventReqPayloadMapping["startSession"]) =>
    electron.ipcRenderer.invoke("startSession", { filePath }),
  manageSession: ({
    sessionPath,
    type,
  }: EventReqPayloadMapping["manageSession"]) =>
    electron.ipcRenderer.invoke("manageSession", { sessionPath, type }),
});
