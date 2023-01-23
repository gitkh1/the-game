import { T_SigninData, T_SignupData } from '../global/types';
import { Api } from './Api';
import { AUTH_BASE_URL, ERROR_MESSAGE, RESOURCES_BASE_URL } from './constants';

const api = new Api(AUTH_BASE_URL);

export const authApi = {
  signin: async <T>(data: T_SigninData): Promise<T | unknown> => {
    try {
      return api.post('/signin', data);
    } catch (err) {
      console.log(ERROR_MESSAGE, err);
    }
  },
  signup: async <T>(data: T_SignupData): Promise<T | unknown> => {
    try {
      const response = await api.post('/signup', data);
      return await response.json();
    } catch (err) {
      console.log(ERROR_MESSAGE, err);
    }
  },
  getInfo: async <T>(): Promise<T | undefined> => {
    try {
      const response = await api.get(`/user`);
      const preData = await response.json();
      let data = preData;
      if (data.avatar) {
        data = {
          ...data,
          avatar: `${RESOURCES_BASE_URL}${preData.avatar}`,
        };
      }
      return data;
    } catch (err) {
      console.log(ERROR_MESSAGE, err);
    }
  },
};
