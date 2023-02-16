import { I_OAuthSignin } from "../global/types";

import { Api } from "./Api";
import { ERROR_MESSAGE, OAUTH_BASE_URL, REDIRECT_URL } from "./constants";

const api = new Api(OAUTH_BASE_URL);

export const oAuthApi = {
  getServiceId: async () => {
    try {
      const response = await api.get("/service-id");
      if (response.ok) {
        const { service_id: serviceId } = (await response.json()) as { service_id: string };

        window.location.replace(`https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${REDIRECT_URL}`);
      }
    } catch (err) {
      console.log(ERROR_MESSAGE, err);
    }
  },
  signin: async <T>(data: I_OAuthSignin): Promise<T | unknown> => {
    try {
      return api.post("/", data);
    } catch (err) {
      console.log(ERROR_MESSAGE, err);
    }
  },
};
