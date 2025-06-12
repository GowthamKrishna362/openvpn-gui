import { exec } from "child_process";
import { parseSessionListOutput } from "../util/parser.js";
import { buildSessionManageCommand } from "../util/index.js";
import { EventHandlerReqPayloadMapping } from "../types.js";

export function getSessionsList(): Promise<OpenVPNSession[]> {
  return new Promise((resolve, reject) => {
    exec("openvpn3 sessions-list", (error, stdout, stderr) => {
      if (error) return reject(`Error: ${error.message}`);
      if (stderr) return reject(`stderr: ${stderr}`);
      resolve(parseSessionListOutput(stdout));
    });
  });
}

export function pauseSession({
  sessionPath,
}: EventHandlerReqPayloadMapping["pauseSession"]): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      buildSessionManageCommand("--pause", sessionPath),
      (error, stdout, stderr) => {
        if (error) return reject(`Error: ${error.message}`);
        if (stderr) return reject(`stderr: ${stderr}`);
        resolve(stdout);
      },
    );
  });
}

export function resumeSession({
  sessionPath,
}: EventHandlerReqPayloadMapping["resumeSession"]): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      buildSessionManageCommand("--resume", sessionPath),
      (error, stdout, stderr) => {
        if (error) return reject(`Error: ${error.message}`);
        if (stderr) return reject(`stderr: ${stderr}`);
        resolve(stdout);
      },
    );
  });
}
