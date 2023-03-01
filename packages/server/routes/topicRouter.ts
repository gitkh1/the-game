/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { TopicController } from "../controllers/topicController";

const topicController = new TopicController();

const topicRouter = Router();

topicRouter.get("/", topicController.getAllTopics);
topicRouter.post("/", topicController.createTopic);
topicRouter.delete("/:id", topicController.deleteTopic);

export { topicRouter };
