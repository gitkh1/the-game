/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { MessageController } from "../controllers/messageController";

const messageController = new MessageController();

const messageRouter = Router();

messageRouter.get("/", messageController.getMessages);
messageRouter.post("/", messageController.createMessage);
messageRouter.delete("/:id", messageController.deleteMessage);
messageRouter.post("/:messageId/emoji", messageController.createEmoji);
messageRouter.delete("/:messageId/emoji/:emojiId", messageController.deleteEmoji);

export { messageRouter };
