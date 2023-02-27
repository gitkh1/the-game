import { Api } from "../../../../api/Api";

import { I_Topic } from "./models";

const BASE_URL = "https://my-app.localhost.ya-praktikum.tech:3001/api";

const api = new Api(BASE_URL);

export const forumApi = {
  getAllTopics: async <T = unknown>(): Promise<T> => {
    return await api.get<T>("/topic");
  },
  createTopic: async <T = unknown>(data: Omit<I_Topic, "id">): Promise<T> => {
    return await api.post<T>("/topic", data);
  },
  removeTopic: async <T = unknown>(id: number): Promise<T> => {
    return await api.delete<T>(`/topic/${id}`);
  },
};
