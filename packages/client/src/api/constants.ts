export const ERROR_MESSAGE = "Что-то пошло не так...";

export const HOST = "my-app.localhost.ya-praktikum.tech:3001";

export const TEAM_NAME = "Popstar";
export const LEADERBOARD_ROWS_LIMIT = 20;
export const DEFAULT_TIMEOUT = 500;

const YANDEX_API_BASE_URL = "https://ya-praktikum.tech/api/v2";
export const AUTH_BASE_URL = YANDEX_API_BASE_URL + "/auth";
export const OAUTH_BASE_URL = YANDEX_API_BASE_URL + "/oauth/yandex";
export const REDIRECT_URL = `https://${HOST}`;
export const USER_BASE_URL = YANDEX_API_BASE_URL + "/user";
export const LEADERBOARD_BASE_URL = YANDEX_API_BASE_URL + "/leaderboard";
export const RESOURCES_BASE_URL = YANDEX_API_BASE_URL + "/resources";

const POPSTART_API_BASE_URL = `https://${HOST}/api`;
export const FEEDBACK_BASE_URL = POPSTART_API_BASE_URL + "/feedback";
export const PAYMENTS_BASE_URL = POPSTART_API_BASE_URL + "/payments";

export const PAYMENT_TIMEOUT = 5 * 60 * 1000; /* 5 minutes */

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
