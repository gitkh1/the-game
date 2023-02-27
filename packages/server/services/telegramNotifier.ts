/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import TelegramBot from "node-telegram-bot-api";

import { TELEGRAM_TOKEN } from "../configuration";
import { I_Notifier } from "../interfaces/notifier";

export class TelegramNotifier implements I_Notifier {
  static errorMessage = "Возникла ошибка при отправке сообщения";
  static successMessage = "Сообщение успешно отправлено";

  private bot: TelegramBot | null = null;
  private chatId: number | null = null;

  constructor(chatLink: string) {
    void this.init(chatLink);
  }

  async init(chatLink: string) {
    try {
      this.bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
      this.chatId = (await this.bot.getChat(chatLink))?.id;
    } catch (_) {
      this.bot = null;
      this.chatId = null;
    }
  }

  async send(data: { email: string; name: string; message: string }): Promise<string> {
    if (!this.bot || !this.chatId) return TelegramNotifier.errorMessage;
    try {
      await this.bot.sendMessage(this.chatId, `email: ${data.email}\nname: ${data.name}\ntext: ${data.message}`);
      return TelegramNotifier.successMessage;
    } catch (_) {
      return TelegramNotifier.errorMessage;
    }
  }
}
