const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  getSessionsList: () => electron.ipcRenderer.invoke("getSessionsList"),
});
