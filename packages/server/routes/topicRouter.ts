/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { TopicController } from "../controllers/topicController";

const topicController = new TopicController();

const topicRouter = Router();

topicRouter.get("/", topicController.getAll);
topicRouter.get("/:id", topicController.getById);
topicRouter.post("/", topicController.post);
topicRouter.delete("/:id", topicController.delete);

export { topicRouter };
