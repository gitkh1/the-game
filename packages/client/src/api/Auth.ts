import { I_Signin, I_Signup } from '../global/types';
import { Api } from './Api';
import { AUTH_BASE_URL, ERROR_MESSAGE, RESOURCES_BASE_URL } from './constants';

const api = new Api(AUTH_BASE_URL);

export const authApi = {
  signin: async <T>(data: I_Signin): Promise<T | unknown> => {
    try {
      return api.post('/signin', data);
    } catch (err) {
      console.log(ERROR_MESSAGE, err);
    }
  },
  signup: async <T>(data: I_Signup): Promise<T | unknown> => {
    try {
      const response = await api.post('/signup', data);
      return await response.json();
    } catch (err) {
      console.log(ERROR_MESSAGE, err);
    }
  },
  getUser: async <T>(): Promise<T> => {
    try {
      const response = await api.get(`/user`);
      const data = await response.json();
      if (data.avatar) {
        data.avatar = `${RESOURCES_BASE_URL}${data.avatar}`;
      }
      return data;
    } catch (err) {
      console.log(ERROR_MESSAGE, err);
      throw err;
    }
  },
};
