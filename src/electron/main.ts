import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";
import { getSessionsList, pauseSession, resumeSession } from "./vpn/openvpn.js";
import { ipcHandleAsync } from "./util/index.js";

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
  ipcHandleAsync("pauseSession", pauseSession);
  ipcHandleAsync("resumeSession", resumeSession);
});
