import { I_SigninData, I_SignupData } from '../global/types';
import { Api } from './Api';
import { AUTH_BASE_URL, ERROR_MESSAGE } from './constants';

const api = new Api(`${AUTH_BASE_URL}/auth`);

export const authApi = {
  signin: <T>(data: I_SigninData): Promise<T | unknown> => {
    return api.post('/signin', data);
  },
  signup: async <T>(data: I_SignupData): Promise<T | unknown> => {
    try {
      const response = await api.post('/signup', data);
      return await response.json();
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(ERROR_MESSAGE);
    }
  },
  getUser: () => {
    return api.get('/user');
  },
};
