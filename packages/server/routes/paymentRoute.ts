import { Request, Router } from "express";

import { HOST } from "../configuration";
import { PaymentController } from "../controllers/paymentController";
import { T_CheckId } from "../types/payments";

const paymentRouter = Router();

const paymentController = new PaymentController({ returnUrl: `https://${HOST}/thanks` });

paymentRouter.post("/api/payments", (req, res) => void paymentController.post(req, res));
paymentRouter.get("/api/payments/:paymentId", (req: Request<T_CheckId>, res) => {
  void paymentController.get(req, res);
});

export { paymentRouter };
