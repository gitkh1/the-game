export const ERROR_MESSAGE = "Что-то пошло не так...";

const { HOST = location.hostname, SERVER_PORT = location.port } = globalThis.process?.env ?? {};

export const TEAM_NAME = "Popstar";
export const LEADERBOARD_ROWS_LIMIT = 20;
export const DEFAULT_TIMEOUT = 500;
export const PAYMENT_TIMEOUT = 5 * 60 * 1000; /* 5 minutes */

const HOST_URL = `https://${HOST}:${SERVER_PORT}`;
const BASE_URL = HOST_URL + "/proxy";
export const API_URL = HOST_URL + "/api";
export const AUTH_BASE_URL = BASE_URL + "/auth";
export const OAUTH_BASE_URL = BASE_URL + "/oauth/yandex";
export const REDIRECT_URL = HOST_URL;
export const USER_BASE_URL = BASE_URL + "/user";
export const LEADERBOARD_BASE_URL = BASE_URL + "/leaderboard";
export const RESOURCES_BASE_URL = BASE_URL + "/resources";
export const GEO_URL = HOST_URL + "/geo";

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
