import { Api } from './Api';
import { AUTH_BASE_URL } from './constants';

const ENDPOINT = '/user';
const api = new Api(`${AUTH_BASE_URL}${ENDPOINT}`);

export const userApi = {
  getUserById: (id: number): Promise<Response> => {
    return api.get(`/${id}`);
  },
};
