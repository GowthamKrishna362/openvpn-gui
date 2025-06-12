import { exec } from "child_process";
import { parseSessionListOutput } from "./parser.js";

export function getSessionsList(): Promise<OpenVPNSession[]> {
  return new Promise((resolve, reject) => {
    exec("openvpn3 sessions-list", (error, stdout, stderr) => {
      if (error) return reject(`Error: ${error.message}`);
      if (stderr) return reject(`stderr: ${stderr}`);
      resolve(parseSessionListOutput(stdout));
    });
  });
}

function buildSessionManageCommand(
  command: string,
  sessionPath: string,
): string {
  return `openvpn3 session-manage ${command} --path ${sessionPath}`;
}

function pauseSession(sessionPath: string): Promise<string> {
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

function resumeSession(sessionPath: string): Promise<string> {
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

function disconnectSession(sessionPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      buildSessionManageCommand("--disconnect", sessionPath),
      (error, stdout, stderr) => {
        if (error) return reject(`Error: ${error.message}`);
        if (stderr) return reject(`stderr: ${stderr}`);
        resolve(stdout);
      },
    );
  });
}

export function manageSession({
  sessionPath,
  type,
}: EventReqPayloadMapping["manageSession"]) {
  switch (type) {
    case "pause":
      return pauseSession(sessionPath);
    case "resume":
      return resumeSession(sessionPath);
    case "disconnect":
      return disconnectSession(sessionPath);
  }
}

export function startSession({
  filePath,
}: EventReqPayloadMapping["startSession"]): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      `openvpn3 session-start --config "${filePath}"`,
      (error, stdout, stderr) => {
        if (error) return reject(error);
        if (stderr) return reject(stderr);
        return resolve(stdout);
      },
    );
  });
}
