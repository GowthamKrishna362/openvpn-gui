import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util/index.js";
import { getPreloadPath } from "./pathResolver.js";
import {
  getSessionsList,
  manageSession,
  startSession,
} from "./util/openvpn.js";
import { ipcHandleAsync } from "./util/index.js";
import { selectOvpnFile } from "./util/file.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  ipcHandleAsync("getSessionsList", getSessionsList);
  ipcHandleAsync("manageSession", manageSession);
  ipcHandleAsync("selectOvpnFile", selectOvpnFile);
  ipcHandleAsync("startSession", startSession);
});
