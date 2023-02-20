import { Request, Response } from "express";
import { CallbackError } from "mongoose";

import { Feedback, I_Feedback } from "../models/feedbackModels";

class FeedbackController {
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
      res.json(record);
    });
  }
  async get(_: Request, res: Response<I_Feedback[] | CallbackError>) {
    const records = await Feedback.find({});
    res.json(records);
  }
}

export const feedbackController = new FeedbackController();
