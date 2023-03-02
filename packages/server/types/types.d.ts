declare module "services/telegramNotifier" {
  export class TelegramNotifier {
    constructor(chatLink: string);
    send(message: string): Promise<string>;
  }
}
declare module "interfaces/notifier" {
  export interface I_Notifier {
    send(message: string): Promise<string>;
  }
}
