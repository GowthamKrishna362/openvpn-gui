export function parseSessionListOutput(output: string): OpenVPNSession[] {
  const lines = output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const sessions: OpenVPNSession[] = [];
  let iteratedSession: OpenVPNSession | null = null;

  for (const line of lines) {
    if (line.startsWith("Path:")) {
      // Create a new session object when "Path:" is found
      if (iteratedSession) {
        sessions.push(iteratedSession);
      }
      iteratedSession = { path: line.split("Path:")[1].trim() };
    } else if (!iteratedSession) {
      // Skip lines before the first session starts
      continue;
    } else if (line.startsWith("Created:")) {
      const createdMatch = line.match(/^Created:\s+(.+?)\s+PID:\s+(\d+)$/);
      if (createdMatch) {
        iteratedSession.created = createdMatch[1];
        iteratedSession.pid = createdMatch[2];
      }
    } else if (line.startsWith("Owner:")) {
      const match = line.match(/Owner:\s+(.*?)\s+Device:\s+(.*)/);
      if (match) {
        iteratedSession.owner = match[1];
        iteratedSession.device = match[2];
      }
    } else if (line.startsWith("Config name:")) {
      const configMatch = line.match(/Config name:\s+(.*)\s+\((.*)\)/);
      if (configMatch) {
        iteratedSession.configName = configMatch[1];
        iteratedSession.configNote = configMatch[2];
      } else {
        iteratedSession.configName = line.split("Config name:")[1].trim();
      }
    } else if (line.startsWith("Connected to:")) {
      iteratedSession.connectedTo = line.split("Connected to:")[1].trim();
    } else if (line.startsWith("Status:")) {
      iteratedSession.status = line.split("Status:")[1].trim();
    }
  }

  if (iteratedSession) {
    sessions.push(iteratedSession);
  }

  return sessions;
}
