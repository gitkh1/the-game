declare module "utils" {
  export function findIP(): null | string;
  export function makeStartLogsText(hosts: string[], protocol: string, port: number | string | undefined): string;
}
