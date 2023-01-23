import { _TFixTsAny } from '../typings';
import { queryStringify } from '../utils/helpers';

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface Options {
  method?: Method,
  data?: _TFixTsAny,
  headers?: Record<string, string>,
  timeout?: number
}

class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  private defaultOptions = {
    method: Method.GET,
    timeout: 5000,
  };

  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = `${HTTPTransport.API_URL}${baseURL}`;
  }

  public get<Response>(patch = '/', options = {} as Options): Promise<Response> {
    const data = options?.data;
    const url = this.baseURL + patch;
    const urlWithData = data ? `${url}${queryStringify(data)}` : url;
    return this.request(urlWithData, { ...options, method: Method.GET });
  }

  public post<Response>(patch: string, options = {}): Promise<Response> {
    const url = this.baseURL + patch;
    return this.request(url, { ...options, method: Method.POST });
  }

  public put<Response>(patch: string, options = {}): Promise<Response> {
    const url = this.baseURL + patch;
    return this.request(url, { ...options, method: Method.PUT });
  }

  public delete<Response>(patch: string, options = {}): Promise<Response> {
    const url = this.baseURL + patch;
    return this.request(url, { ...options, method: Method.DELETE });
  }

  private request<Response>(
    url: string,
    options: Options = this.defaultOptions,
  ): Promise<Response> {
    const {
      headers = {},
      method,
      data,
      timeout,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method ?? Method.GET, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response.reason);
          }
        }
      };

      xhr.onabort = () => reject(new Error('abort'));
      xhr.onerror = () => reject(new Error('network error'));
      xhr.ontimeout = () => reject(new Error('timeout'));

      xhr.timeout = timeout ?? this.defaultOptions.timeout;
      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (!data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default HTTPTransport;
