import { Router } from "express";

import { FeedbackController } from "../controllers/feedbackController";
import { TelegramNotifier } from "../services/telegramNotifier";

const { TELEGRAM_CHAT_ID, TELEGRAM_TOKEN } = process.env;

const telegramNotifier = new TelegramNotifier(TELEGRAM_CHAT_ID, TELEGRAM_TOKEN);
const feedbackController = new FeedbackController(telegramNotifier);

const postHandler = feedbackController.post;
const getHandler = feedbackController.get;

const feedbackRouter = Router();

feedbackRouter.post("/", postHandler);
feedbackRouter.get("/", getHandler);

export { feedbackRouter };
