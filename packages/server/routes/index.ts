import { Router } from "express";
import helmet from "helmet";

import { feedbackRouter } from "./feedbackRouter";
import { topicRouter } from "./topicRouter";

const mainRouter = Router();

mainRouter.use(helmet());
mainRouter.use("/feedback", feedbackRouter);
mainRouter.use("/topic", topicRouter);

export { mainRouter };
