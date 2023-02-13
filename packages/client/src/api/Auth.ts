import type { I_SigninPayload, I_SignupPayload, I_UserInfo } from "../global/types";

import { Api } from "./Api";
import { AUTH_BASE_URL, ERROR_MESSAGE, RESOURCES_BASE_URL } from "./constants";

const api = new Api(AUTH_BASE_URL);

export const authApi = {
  signin: async <T = unknown>(data: I_SigninPayload): Promise<T> => {
    return await api.post("/signin", data);
  },
  signup: async <T = unknown>(data: I_SignupPayload): Promise<T> => {
    return await api.post("/signup", data);
  },
  getUser: async (): Promise<I_UserInfo> => {
    try {
      const response = await api.get<I_UserInfo>(`/user`);
      if (response.avatar) {
        response.avatar = `${RESOURCES_BASE_URL}${response.avatar}`;
      }
      return response;
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(ERROR_MESSAGE);
    }
  },
};
