import { ipcMain } from "electron";
import type {
  asyncIPCHandler,
  EventHandlerReqPayloadMapping,
} from "../types.js";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function ipcHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => EventPayloadMapping[Key],
) {
  ipcMain.handle(key, () => handler());
}

export function ipcHandleAsync<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: asyncIPCHandler<Key>,
) {
  ipcMain.handle(
    key,
    (_event, requestPayload: EventHandlerReqPayloadMapping[Key]) => {
      return handler(requestPayload);
    },
  );
}

export function buildSessionManageCommand(
  command: string,
  sessionPath: string,
): string {
  return `openvpn3 session-manage ${command} --path ${sessionPath}`;
}
