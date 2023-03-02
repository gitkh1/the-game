import { Request, Response } from "express";

import { PaymentService } from "../services/paymentService";
import { T_CheckId, T_CreateAmount, T_PaymentConfirmation, T_SimplePayment } from "../types/payments";

const paymentService = new PaymentService();

export class PaymentController {
  returnUrl: string;
  constructor({ returnUrl }: { returnUrl: string }) {
    this.returnUrl = returnUrl;
  }

  post = async (req: Request<unknown, T_CreateAmount, T_CreateAmount>, res: Response<T_PaymentConfirmation | Error>) => {
    try {
      const { amount } = req.body;
      const payment = await paymentService.create({
        amount,
        description: "Покупка в магазине Popstar",
        returnUrl: this.returnUrl,
      });
      const paymentId = payment.id;
      const url = payment.confirmation.confirmation_url;
      res.json({
        paymentId: paymentId,
        redirectUrl: url,
      });
    } catch (err) {
      if (err instanceof Error) res.status(500).json(err);
    }
  };

  get = async (req: Request<T_CheckId>, res: Response<T_SimplePayment | Error>) => {
    try {
      const { paymentId } = req.params;
      const payment = await paymentService.get(paymentId);
      const { id, status } = payment;
      res.json({ id, status });
    } catch (err) {
      if (err instanceof Error) res.status(500).json(err);
    }
  };
}
