type OpenVPNSession = {
  path: string;
  created?: string;
  pid?: string;
  owner?: string;
  device?: string;
  configName?: string;
  configNote?: string;
  connectedTo?: string;
  status?: string;
};

type sessionManagementAction = "pause" | "resume" | "disconnect";

type EventPayloadMapping = {
  getSessionsList: OpenVPNSession[];
  selectOvpnFile: string | null;
  manageSession: string;
  startSession: string;
};

type EventReqPayloadMapping = {
  getSessionsList: undefined;
  selectOvpnFile: undefined;
  manageSession: { sessionPath: string; type: sessionManagementAction };
  startSession: { filePath: string };
};

interface Window {
  electron: {
    getSessionsList: () => Promise<EventPayloadMapping["getSessionsList"]>;
    selectOvpnFile: () => Promise<EventPayloadMapping["selectOvpnFile"]>;
    manageSession: (
      payload: EventReqPayloadMapping["manageSession"],
    ) => Promise<EventPayloadMapping["manageSession"]>;
    startSession: (
      payload: EventReqPayloadMapping["startSession"],
    ) => Promise<EventPayloadMapping["startSession"]>;
  };
}
