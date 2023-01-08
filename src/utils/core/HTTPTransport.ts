enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: Methods
  data?: any
  headers?: any
}

type OptionsWithoutMethod = Omit<Options, 'method'>

function queryStringify(data: Record<string, string>) {
  if (data) {
    const keys = Object.keys(data)
    return keys.reduce((result, key, index) => {
      return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`
    }, '?')
  } else {
    return ''
  }
}

class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: Methods.GET })
  }

  post(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: Methods.POST })
  }

  put(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: Methods.PUT })
  }

  delete(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: Methods.DELETE })
  }

  request(
    url: string,
    options: Options = { method: Methods.GET }
  ): Promise<XMLHttpRequest> {
    let { data, method, headers } = options

    if (data instanceof FormData) {
      headers = {}
    }

    if (method === Methods.GET) {
      url += queryStringify(data)
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)

      for (let key in headers) {
        xhr.setRequestHeader(key, headers[key])
      }

      xhr.onload = () => {
        if (xhr.status >= 300) {
          reject(xhr)
        } else {
          resolve(xhr)
        }
      }

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      xhr.withCredentials = true
      xhr.responseType = 'json'

      if (method === Methods.GET || !data) {
        xhr.send()
      } else {
        xhr.send(data)
      }
    })
  }
}

function fetchWithRetry(url: string, options: Record<string, any>): unknown {
  let counter = options['retries']

  let onError = function () {
    if (counter > 0) {
      options['retries'] = counter - 1
      delete options['method']
      return fetchWithRetry(url, options)
    } else {
      throw new Error('...')
    }
  }

  let transport = new HTTPTransport()
  delete options['retries']
  options['method'] = Methods.GET
  return transport
    .get(url, options)
    .then((res) => {
      return res
    })
    .catch(onError)
}

export { HTTPTransport, fetchWithRetry }
