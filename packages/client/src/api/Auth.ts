import { T_SigninData, T_SignupData } from '../global/types';
import { Api } from './Api';
import { AUTH_BASE_URL, ERROR_MESSAGE } from './constants';

const api = new Api(AUTH_BASE_URL);

export const authApi = {
  signin: <T>(data: T_SigninData): Promise<T | unknown> => {
    return api.post('/signin', data);
  },
  signup: async <T>(data: T_SignupData): Promise<T | unknown> => {
    try {
      const response = await api.post('/signup', data);
      return await response.json();
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(ERROR_MESSAGE);
    }
  },
};
