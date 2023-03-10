/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { PaymentController } from "../controllers/paymentController";

const { HOST, SERVER_PORT } = process.env;

const paymentController = new PaymentController({ returnUrl: `https://${HOST}:${SERVER_PORT}/thanks` });

const paymentRouter = Router();

paymentRouter.post("/", paymentController.post);
paymentRouter.get("/:id", paymentController.get);

export { paymentRouter };
