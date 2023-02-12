import axios, { Axios, AxiosError, RawAxiosRequestHeaders } from "axios";

export const ERROR_MESSAGE = "Что-то пошло не так...";
export const BASE_URL = "https://ya-praktikum.tech/api/v2";

export const METHODS = {
  GET: "get",
  PUT: "put",
  POST: "post",
  DELETE: "delete",
} as const;

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json;charset=utf-8",
  "Access-Control-Allow-Origin": "*",
};

export type T_CrudMethods = typeof METHODS[keyof typeof METHODS];

export class BaseApi {
  private axios: Axios;
  constructor() {
    this.axios = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
    });
  }

  private async fetchMethod<T = Record<string, unknown>>(url: string, method: T_CrudMethods, data?: unknown, headers?: RawAxiosRequestHeaders) {
    try {
      const query = this.axios[method];

      const response = await query<T>(url, data, { data, headers: { ...DEFAULT_HEADERS, ...headers } });
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) throw new Error(err.message);
      throw new Error(ERROR_MESSAGE);
    }
  }

  public get<T>(endPoint: string): Promise<T> {
    return this.fetchMethod<T>(endPoint, METHODS.GET);
  }

  public put<T = unknown>(endPoint: string, data?: unknown, headers?: RawAxiosRequestHeaders): Promise<T> {
    return this.fetchMethod<T>(endPoint, METHODS.PUT, data, headers);
  }

  public post<T>(endPoint: string, data?: unknown, headers?: RawAxiosRequestHeaders): Promise<T> {
    return this.fetchMethod<T>(endPoint, METHODS.POST, data, headers);
  }

  public delete<T>(endPoint: string, data?: unknown, headers?: RawAxiosRequestHeaders): Promise<T> {
    return this.fetchMethod<T>(endPoint, METHODS.DELETE, data, headers);
  }
}
