import { DEFAULT_HEADERS, ERROR_MESSAGE, METHODS, T_CrudMethods } from "./constants";

const DEFAULT_TIMEOUT = 500;
export class Api {
  constructor(private baseUrl: string) {}

  private async parseResponse(response: Response) {
    if (!response.ok) {
      const error = (await response.json()) as Record<string, unknown>;
      const message = ("reason" in error ? error.reason : ERROR_MESSAGE) as string;
      throw new Error(message);
    }
    return response;
  }

  private async fetchMethod(url: string, method: T_CrudMethods, data?: unknown) {
    try {
      let requestInit: RequestInit = {
        method: method,
        credentials: "include",
        headers: DEFAULT_HEADERS,
      };
      if (data) {
        requestInit = { ...requestInit, body: JSON.stringify(data) };
      }
      const response = await fetch(url, requestInit);
      return await this.parseResponse(response);
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(ERROR_MESSAGE);
    }
  }

  public async get(endPoint: string): Promise<Response> {
    return await this.fetchMethod(`${this.baseUrl}${endPoint}`, METHODS.GET);
  }

  public async put(endPoint: string, data?: unknown): Promise<Response> {
    return await this.fetchMethod(`${this.baseUrl}${endPoint}`, METHODS.PUT, data);
  }

  public async post(endPoint: string, data?: unknown): Promise<Response> {
    return await this.fetchMethod(`${this.baseUrl}${endPoint}`, METHODS.POST, data);
  }

  public async delete(endPoint: string, data?: unknown): Promise<Response> {
    return await this.fetchMethod(`${this.baseUrl}${endPoint}`, METHODS.DELETE, data);
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
