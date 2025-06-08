import { exec } from "child_process";
import { parseSessionListOutput } from "../util/parser.js";
import { log } from "console";

export function getSessionsList() {
  return new Promise((resolve, reject) => {
    exec("openvpn3 sessions-list", (error, stdout, stderr) => {
      if (error) return reject(`Error: ${error.message}`);
      if (stderr) return reject(`stderr: ${stderr}`);
      log(stdout, "abcdef");
      resolve(parseSessionListOutput(stdout));
    });
  });
}
