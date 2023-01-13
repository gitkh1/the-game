import { ERROR_MESSAGE } from './constants';

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
}
