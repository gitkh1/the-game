import { I_OAuthSignin } from "../global/types";

import { Api } from "./Api";
import { ERROR_MESSAGE, OAUTH_BASE_URL, REDIRECT_URL } from "./constants";

const api = new Api(OAUTH_BASE_URL);

export const oAuthApi = {
  getServiceId: async () => {
    try {
      const { service_id: serviceId } = await api.get<{ service_id: string }>("/service-id");
      window.location.replace(`https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${REDIRECT_URL}`);
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(ERROR_MESSAGE);
    }
  },
  signin: async <T>(data: I_OAuthSignin): Promise<T> => {
    try {
      return api.post<T>("/", data);
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(ERROR_MESSAGE);
    }
  },
};
