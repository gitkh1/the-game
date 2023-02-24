import { Router } from "express";

import { TELEGRAM_CHAT_ID } from "../configuration";
import { FeedbackController } from "../controllers/feedbackController";
import { TelegramNotifier } from "../services/telegramNotifier";

const telegramNotifier = new TelegramNotifier(TELEGRAM_CHAT_ID);
const feedbackController = new FeedbackController(telegramNotifier);

const postHandler = feedbackController.post;
const getHandler = feedbackController.get;

const feedbackRouter = Router();

feedbackRouter.post("/api/feedback", postHandler);
feedbackRouter.get("/api/feedback", getHandler);

export { feedbackRouter };
