/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Request, Response } from "express";

import { Emoji, I_Emoji, I_Message, I_Params, Message } from "../models/forumModels";

export class MessageController {
  createMessage = async (req: Request<void, I_Message, I_Message>, res: Response<I_Message | Error>) => {
    try {
      const { authorId, text, commentId } = req.body;
      const message: I_Message = await Message.create({ commentId, authorId, text });
      res.status(200).json(message);
    } catch (error) {
      if (error instanceof Error) res.status(500).json(error);
    }
  };

  getMessages = async (req: Request<void, I_Message[], void, Pick<I_Params, "commentId">>, res: Response<I_Message[] | Error>) => {
    try {
      const { commentId } = req.query;
      const messages: I_Message[] = await Message.findAll({
        where: { commentId },
        include: {
          model: Emoji,
        },
      });
      res.status(200).json(messages);
    } catch (error) {
      if (error instanceof Error) res.status(500).json(error);
    }
  };

  deleteMessage = async (req: Request<Required<Pick<I_Params, "id">>, string>, res: Response<string | Error>) => {
    try {
      await Message.destroy({ where: { id: req.params.id } });
      res.status(200).json("ok");
    } catch (error) {
      if (error instanceof Error) res.status(500).json(error);
    }
  };

  createEmoji = async (req: Request<Pick<I_Params, "messageId">, I_Message, I_Emoji>, res: Response<I_Message | Error>) => {
    try {
      const { messageId } = req.params;
      const { authorId, hex } = req.body;
      await Emoji.create({ authorId, hex, messageId });
      const [message]: [I_Message, boolean] = await Message.findOrCreate({
        where: { id: messageId },
        include: {
          model: Emoji,
        },
      });
      res.status(200).json(message);
    } catch (error) {
      if (error instanceof Error) res.status(500).json(error);
    }
  };

  deleteEmoji = async (req: Request<Required<Pick<I_Params, "messageId" | "emojiId">>, I_Message>, res: Response<I_Message | Error>) => {
    try {
      const { messageId, emojiId } = req.params;
      await Emoji.destroy({ where: { id: emojiId } });
      const [message]: [I_Message, boolean] = await Message.findOrCreate({
        where: { id: messageId },
        include: {
          model: Emoji,
        },
      });
      res.status(200).json(message);
    } catch (error) {
      if (error instanceof Error) res.status(500).json(error);
    }
  };
}
