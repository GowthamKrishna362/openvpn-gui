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

interface Window {
  electron: {
    getSessionsList: () => Promise<OpenVPNSession[]>;
    pauseSession: (sessionPath: string) => Promise<string>;
    resumeSession: (sessionPath: string) => Promise<string>;
  };
}

type EventPayloadMapping = {
  getSessionsList: OpenVPNSession[];
  pauseSession: string;
  resumeSession: string;
};
