import type { I_OAuthSignin } from "../global/types";

import { Api } from "./Api";
import { OAUTH_BASE_URL, REDIRECT_URL } from "./constants";

const api = new Api(OAUTH_BASE_URL);

export const oAuthApi = {
  getServiceId: async () => {
    const { service_id: serviceId } = await api.get<{ service_id: string }>("/service-id");
    window.location.replace(`https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${REDIRECT_URL}`);
  },
  signin: async <T>(data: I_OAuthSignin): Promise<T | unknown> => {
    return api.post("/", data);
  },
};
