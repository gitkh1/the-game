import { Request, Response } from "express";
import { CallbackError } from "mongoose";

import type { I_Notifier } from "../interfaces/notifier";
import { Feedback, I_Feedback } from "../models/feedbackModels";

export class FeedbackController {
  private notifier: I_Notifier;
  constructor(notifier: I_Notifier) {
    this.notifier = notifier;
  }

  post = (req: Request<void, I_Feedback, I_Feedback>, res: Response<I_Feedback | CallbackError>) => {
    try {
      const { email, feedback: text, login } = req.body;
      const feedback = new Feedback({
        email,
        feedback: text,
        login,
      });
      feedback.save((err, record) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        void this.notifier.send({ email: record?.email, name: record?.login, message: record?.feedback });
        res.json({ email: record?.email, login: record?.login, feedback: record?.feedback });
      });
    } catch (err) {
      if (err instanceof Error) res.status(500).json(err);
    }
  };

  get = (_: Request, res: Response<I_Feedback[] | CallbackError>) => {
    try {
      Feedback.find({})
        .then((records) => res.json(records))
        .catch((err) => {
          if (err instanceof Error) res.status(500).json(err);
        });
    } catch (err) {
      if (err instanceof Error) res.status(500).json(err);
    }
  };
}
