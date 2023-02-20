import { DEFAULT_HEADERS, DEFAULT_TIMEOUT, ERROR_MESSAGE, METHODS, T_CrudMethods } from "./constants";

export class Api {
  constructor(private baseUrl: string) {}

  private async parseResponse<T = unknown>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = (await response.json()) as Record<string, unknown>;
      const message = ("reason" in error ? error.reason : ERROR_MESSAGE) as string;
      throw new Error(message);
    }
    const body = await response.text();
    try {
      return JSON.parse(body) as T;
    } catch (error) {
      return body as T;
    }
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
      return await this.parseResponse<T>(response);
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

  public async putFile(endPoint: string, data?: FormData): Promise<XMLHttpRequest> {
    try {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(METHODS.PUT, `${this.baseUrl}${endPoint}`);
        xhr.withCredentials = true;
        xhr.timeout = DEFAULT_TIMEOUT;
        xhr.onload = function () {
          resolve(xhr);
        };
        xhr.onabort = reject;
        xhr.onerror = reject;
        xhr.ontimeout = reject;
        xhr.send(data);
      });
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(ERROR_MESSAGE);
    }
  }
}
