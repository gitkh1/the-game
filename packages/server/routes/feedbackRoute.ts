/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from "express";

import { TELEGRAM_CHAT_ID } from "../configuration";
import { FeedbackController } from "../controllers/feedbackController";
import { TelegramNotifier } from "../services/telegramNotifier";

const telegramNotifier = new TelegramNotifier(TELEGRAM_CHAT_ID);
const feedbackController = new FeedbackController(telegramNotifier);

const feedbackRouter = Router();

feedbackRouter.post("/api/feedback", feedbackController.post);
feedbackRouter.get("/api/feedback", feedbackController.get);

export { feedbackRouter };
