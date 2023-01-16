import { ERROR_MESSAGE } from './constants';

const DEFAULT_TIMEOUT = 500;
export class Api {
  constructor(private baseUrl: string) {}

  private async parseResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json();
      const message = 'reason' in error ? error.reason : ERROR_MESSAGE;
      throw new Error(message);
    }

    return response;
  }

  public async get(endPoint: string, headers?: HeadersInit): Promise<Response> {
    try {
      const response = await fetch(`${this.baseUrl}${endPoint}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          ...headers,
        },
      });
      return await this.parseResponse(response);
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(ERROR_MESSAGE);
    }
  }

  public async post(endPoint: string, data?: unknown, headers?: HeadersInit): Promise<Response> {
    try {
      const response = await fetch(`${this.baseUrl}${endPoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          ...headers,
        },
        body: JSON.stringify(data),
      });
      return await this.parseResponse(response);
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(ERROR_MESSAGE);
    }
  }

  public async put(endPoint: string, data?: unknown, headers?: HeadersInit): Promise<Response> {
    try {
      const response = await fetch(`${this.baseUrl}${endPoint}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          ...headers,
        },
        body: JSON.stringify(data),
      });
      return await this.parseResponse(response);
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error(ERROR_MESSAGE);
    }
  }
  public async putFile(endPoint: string, data?: FormData): Promise<XMLHttpRequest> {
    try {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${this.baseUrl}${endPoint}`);

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
