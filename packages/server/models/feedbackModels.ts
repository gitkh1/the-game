import { model, Schema } from "mongoose";

export interface I_Feedback {
  login: string;
  email: string;
  feedback: string;
}

const feedbackSchema = new Schema<I_Feedback>({
  login: {
    type: String,
    trim: true,
    required: [true, "Login is required"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
  },
  feedback: {
    type: String,
    trim: true,
    required: [true, "Feedback is required"],
  },
});

export const Feedback = model("Feedback", feedbackSchema);
