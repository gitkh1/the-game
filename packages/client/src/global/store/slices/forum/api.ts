import { Api } from "../../../../api/Api";
import { API_URL } from "../../../../api/constants";

import { I_Comment, I_Emoji, I_Message, I_Topic } from "./models";

const api = new Api(API_URL);

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
  getComments: async <T = unknown>(topicId: number): Promise<T> => {
    return await api.get<T>(`/comment?topicId=${topicId}`);
  },
  createComment: async <T = unknown>(data: Omit<I_Comment, "id">): Promise<T> => {
    return await api.post<T>("/comment", data);
  },
  removeComment: async <T = unknown>(id: number): Promise<T> => {
    return await api.delete<T>(`/comment/${id}`);
  },
  getMessages: async <T = unknown>(commentId: number): Promise<T> => {
    return await api.get<T>(`/message?commentId=${commentId}`);
  },
  createMessage: async <T = unknown>(data: Omit<I_Message, "id" | "emojis">): Promise<T> => {
    return await api.post<T>("/message", data);
  },
  removeMessage: async <T = unknown>(id: number): Promise<T> => {
    return await api.delete<T>(`/message/${id}`);
  },
  createEmoji: async <T = unknown>(data: Omit<I_Emoji, "id">): Promise<T> => {
    const { messageId, ...rest } = data;
    return await api.post<T>(`/message/${messageId}/emoji`, rest);
  },
  removeEmoji: async <T = unknown>(data: Pick<I_Emoji, "id" | "messageId">): Promise<T> => {
    const { messageId, id } = data;
    return await api.delete<T>(`/message/${messageId}/emoji/${id}`);
  },
};
