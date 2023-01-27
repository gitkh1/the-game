import { I_SigninData, I_SignupData } from '../global/types';
import { Api } from './Api';
import { AUTH_BASE_URL, ERROR_MESSAGE, RESOURCES_BASE_URL } from './constants';

const api = new Api(`${AUTH_BASE_URL}/auth`);

export const authApi = {
  signin: async <T>(data: I_SigninData): Promise<T | unknown> => {
    try {
      return api.post('/signin', data);
    } catch (err) {
      console.log(ERROR_MESSAGE, err);
    }
  },
  signup: async <T>(data: I_SignupData): Promise<T | unknown> => {
    try {
      const response = await api.post('signup', data);
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
  getUser: () => {
    return api.get('/user');
  },
};
