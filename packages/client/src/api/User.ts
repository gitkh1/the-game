import type { I_PasswordPayload, I_ProfilePayload } from "../global/types";

import { Api } from "./Api";
import { USER_BASE_URL } from "./constants";

const api = new Api(USER_BASE_URL);

export const userApi = {
  changeProfile: async <T = unknown>(data: I_ProfilePayload): Promise<T> => {
    return api.put<T>("/profile", data);
  },
  changePwd: async <T = unknown>(data: I_PasswordPayload): Promise<T> => {
    return api.put<T>("/password", data);
  },
  changePhoto: async (data: FormData): Promise<XMLHttpRequest> => {
    return api.putFile("/profile/avatar", data);
  },
};
