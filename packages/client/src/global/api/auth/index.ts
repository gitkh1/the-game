import { BaseApi } from "../base";

import { I_SigninRequest, I_SignupRequest } from "./interfaces";

const api = new BaseApi();

export const authApi = {
  signin: async <T = unknown>(data: I_SigninRequest) => {
    return api.post<T>("/auth/signin", data);
  },
  signup: async <T = unknown>(data: I_SignupRequest) => {
    return api.post<T>("/auth/signup", data);
  },
};

export type { I_SigninRequest, I_SignupRequest };
