import { I_UserPwdData, I_UserUpdateData } from '../global/types';
import { Api } from './Api';
import { ERROR_MESSAGE, USER_BASE_URL } from './constants';

const api = new Api(USER_BASE_URL);

export const userApi = {
  changeProfile: async <T>(data: I_UserUpdateData): Promise<T | unknown> => {
    try {
      return api.put('/profile', data);
    } catch (err) {
      console.log(ERROR_MESSAGE, err);
    }
  },
  changePwd: async <T>(data: I_UserPwdData): Promise<T | unknown> => {
    try {
      return api.put('/password', data);
    } catch (err) {
      console.log(ERROR_MESSAGE, err);
    }
  },
  changePhoto: async <T>(data: FormData): Promise<T | unknown> => {
    try {
      return api.putFile('/profile/avatar', data);
    } catch (err) {
      console.log(ERROR_MESSAGE, err);
    }
  },
};
