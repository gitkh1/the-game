export const ERROR_MESSAGE = "Что-то пошло не так...";

const BASE_URL = "https://ya-praktikum.tech/api/v2";
export const AUTH_BASE_URL = BASE_URL + "/auth";
export const OAUTH_BASE_URL = BASE_URL + "/oauth/yandex";
export const REDIRECT_URL = BASE_URL + "http://localhost:3000/";
export const USER_BASE_URL = BASE_URL + "/user";
export const RESOURCES_BASE_URL = BASE_URL + "/resources";

export const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
} as const;

export type T_CrudMethods = keyof typeof METHODS;

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json;charset=utf-8",
  "Access-Control-Allow-Origin": "*",
};
