import { ipcMain } from "electron";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

type asyncIPCHandler<Key extends keyof EventReqPayloadMapping> = (
  requestPayload: EventReqPayloadMapping[Key],
) => Promise<EventPayloadMapping[Key]>;

export function ipcHandleAsync<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: asyncIPCHandler<Key>,
) {
  ipcMain.handle(key, (_event, requestPayload: EventReqPayloadMapping[Key]) => {
    return handler(requestPayload);
  });
}
