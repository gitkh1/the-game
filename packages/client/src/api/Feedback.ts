import type { I_Feedback } from "../global/types";

import { Api } from "./Api";
import { API_URL } from "./constants";

const api = new Api(API_URL + "/feedback");

export const feedbackApi = {
  send: async <T = unknown>(data: I_Feedback): Promise<T> => {
    return await api.post<T>("/", data);
  },
};
