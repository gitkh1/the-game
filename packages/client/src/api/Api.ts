/* eslint-disable @typescript-eslint/no-unsafe-return */
import { DEFAULT_HEADERS, ERROR_MESSAGE, METHODS, T_CrudMethods } from "./constants";

export class Api {
  constructor(private baseUrl: string) {}

  private async parseResponse(response: Response) {
    if (!response.ok) {
      const error = (await response.json()) as Record<string, unknown>;
      const message = ("reason" in error ? error.reason : ERROR_MESSAGE) as string;
      throw new Error(message);
    }
    return await response.json();
  }

  private async fetchMethod<T = unknown>(url: string, method: T_CrudMethods, data?: unknown): Promise<T> {
    try {
      const requestInit: RequestInit = {
        method: method,
        credentials: "include",
        headers: DEFAULT_HEADERS,
      };
      if (data) {
        requestInit.body = JSON.stringify(data);
      }
      const response = await fetch(url, requestInit);
      return await this.parseResponse(response);
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(ERROR_MESSAGE);
    }
  }

  public async get<T = unknown>(endPoint: string): Promise<T> {
    return await this.fetchMethod<T>(`${this.baseUrl}${endPoint}`, METHODS.GET);
  }

  public async put<T = unknown>(endPoint: string, data?: unknown): Promise<T> {
    return await this.fetchMethod<T>(`${this.baseUrl}${endPoint}`, METHODS.PUT, data);
  }

  public async post<T = unknown>(endPoint: string, data?: unknown): Promise<T> {
    return await this.fetchMethod<T>(`${this.baseUrl}${endPoint}`, METHODS.POST, data);
  }

  public async delete<T = unknown>(endPoint: string, data?: unknown): Promise<T> {
    return await this.fetchMethod<T>(`${this.baseUrl}${endPoint}`, METHODS.DELETE, data);
  }
}
