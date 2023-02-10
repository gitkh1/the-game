import { BaseApi } from "../../api/base";

import { I_PasswordPayload, I_ProfilePayload } from "./models";

const api = new BaseApi();

export const userApi = {
  getUser: async <T = unknown>() => {
    return api.get<T>(`/auth/user`);
  },
  changeProfile: <T = unknown>(data: I_ProfilePayload) => {
    return api.put<T>("/user/profile", data);
  },
  changePassword: <T = unknown>(data: I_PasswordPayload) => {
    return api.put<T>("/user/password", data);
  },
  changePhoto: <T = unknown>(data: FormData) => {
    return api.put<T>("/user/profile/avatar", data, {
      "Content-Type": "multipart/form-data",
    });
  },
};
