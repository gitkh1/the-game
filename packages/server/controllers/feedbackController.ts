/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response } from "express";
import { CallbackError } from "mongoose";

import type { I_Notifier } from "../interfaces/notifier";
import { Feedback, I_Feedback } from "../models/feedbackModels";

export class FeedbackController {
  private notifier: I_Notifier;
  constructor(notifier: I_Notifier) {
    this.notifier = notifier;
    this.post = this.post.bind(this);
    this.get = this.get.bind(this);
  }

  post(req: Request<void, I_Feedback, I_Feedback>, res: Response<I_Feedback | CallbackError>) {
    const { email, feedback: text, login } = req.body;
    const feedback = new Feedback({
      email,
      feedback: text,
      login,
    });
    feedback.save((err, record) => {
      if (err) {
        res.status(500).json(err);
      }
      void this.notifier.send({ email: record.email, name: record.login, message: record.feedback });
      res.json({ email: record.email, login: record.login, feedback: record.feedback });
    });
  }
  async get(_: Request, res: Response<I_Feedback[] | CallbackError>) {
    const records = await Feedback.find({});
    res.json(records);
  }
}
