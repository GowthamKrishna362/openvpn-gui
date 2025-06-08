import path from "path";
import { app } from "electron";
import { isDev } from "./util/index.js";

export function getPreloadPath(): string {
  const preloadPath = path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "/dist-electron/preload.cjs",
  );
  return preloadPath;
}
