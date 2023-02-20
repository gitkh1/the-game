/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from "express";

import { feedbackController } from "../controllers/feedbackController";

const feedbackRouter = Router();

feedbackRouter.post("/api/feedback", feedbackController.post);
feedbackRouter.get("/api/feedback", feedbackController.get);

export { feedbackRouter };
