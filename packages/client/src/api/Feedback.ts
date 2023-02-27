import type { I_Feedback } from "../global/types";

import { Api } from "./Api";
import { FEEDBACK_BASE_URL } from "./constants";

const api = new Api(FEEDBACK_BASE_URL);

export const feedbackApi = {
  send: async <T = unknown>(data: I_Feedback): Promise<T> => {
    return await api.post<T>("", data);
  },
};
