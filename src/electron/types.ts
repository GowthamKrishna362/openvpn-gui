export type EventHandlerReqPayloadMapping = {
  getSessionsList: undefined;
  pauseSession: { sessionPath: string };
  resumeSession: { sessionPath: string };
};

export type asyncIPCHandler<Key extends keyof EventHandlerReqPayloadMapping> = (
  requestPayload: EventHandlerReqPayloadMapping[Key],
) => Promise<EventPayloadMapping[Key]>;
