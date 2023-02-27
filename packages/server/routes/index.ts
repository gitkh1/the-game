import { Router } from "express";

import { feedbackRouter } from "./feedbackRouter";
import { topicRouter } from "./topicRouter";

const mainRouter = Router();

mainRouter.use("/feedback", feedbackRouter);
mainRouter.use("/topic", topicRouter);

export { mainRouter };
