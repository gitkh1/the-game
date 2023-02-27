export interface I_Notifier {
  send(data: { email: string; name: string; message: string }): Promise<string>;
}
