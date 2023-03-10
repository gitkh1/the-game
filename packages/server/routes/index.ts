import { Router } from "express";
import helmet from "helmet";

import { commentRouter } from "./commentRouter";
import { feedbackRouter } from "./feedbackRouter";
import { messageRouter } from "./messageRouter";
import { paymentRouter } from "./paymentRoute";
import { topicRouter } from "./topicRouter";

const mainRouter = Router();
mainRouter.use(helmet());

mainRouter.use("/feedback", feedbackRouter);
mainRouter.use("/topic", topicRouter);
mainRouter.use("/comment", commentRouter);
mainRouter.use("/message", messageRouter);
mainRouter.use("/payment", paymentRouter);

export { mainRouter };
