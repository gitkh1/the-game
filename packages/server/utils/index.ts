import { networkInterfaces } from "os";

export function findIP(): string | null {
  const nets = networkInterfaces();
  let result: string | null = null;

  for (const name of Object.keys(nets)) {
    const netArray = nets[name];
    if (!netArray) {
      return (result = null);
    }

    for (const net of netArray) {
      if (net.family === "IPv4" && !net.internal && net.address.startsWith("192")) {
        result = net.address;
        break;
      }
    }
  }

  return result;
}

export function makeStartLogsText(hosts: string[], protocol = "https", port: number | string | undefined) {
  return `Running on: \n${hosts.map((host) => `   * ${protocol}://${host}:${port}`).join("\n")}`;
}
