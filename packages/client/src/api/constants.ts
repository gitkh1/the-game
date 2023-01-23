export const ERROR_MESSAGE = 'Что-то пошло не так...';

const BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const AUTH_BASE_URL = BASE_URL + '/auth';
export const USER_BASE_URL = BASE_URL + '/user';
export const RESOURCES_BASE_URL = BASE_URL + '/resources';

export type T_CRUD_METHODS = 'GET' | 'PUT' | 'POST' | 'DELETE';

export const METHODS: Record<T_CRUD_METHODS, T_CRUD_METHODS> = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json;charset=utf-8',
  'Access-Control-Allow-Origin': '*',
};
