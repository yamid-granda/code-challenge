import { IHttpMethod, IHttpMethodKey } from "@/types";
import fetchMock from "fetch-mock";

interface IMockHttpConfig {
  url: string
  response?: unknown
  method?: IHttpMethod
}

interface IMockedRequest {
  body: unknown
}

interface IMockHttpRequestResponse {
  request: IMockedRequest
}

function mockHttpRequest({
  url,
  method,
  response,
}: IMockHttpConfig): IMockHttpRequestResponse {
  const methodConfig: IHttpMethod = method ?? 'GET'
  const methodKey = methodConfig.toLowerCase() as IHttpMethodKey
  let request: IMockHttpPostConfig = { body: undefined }

  fetchMock[methodKey](url, mockHttpCallback(request, response))

  return {
    request
  }
}

interface IMockHttpPostConfig {
  body: unknown
}

const mockHttpCallback = (request: IMockHttpPostConfig, response: unknown) => {
  return (_: unknown, opts: RequestInit) => {
    const newBody = opts.body ? JSON.parse((opts.body || '').toString()) : undefined

    if (request.body) {
      if (Array.isArray(request.body)) {
        request.body.push(newBody)
        return response
      }

      request.body = [request.body, newBody]
      return response
    }

    request.body = newBody
    return response
  }
}

export function mockHttpGet(url: string, response: unknown) {
  return mockHttpRequest({ url, method: 'GET', response })
}

export function mockHttpPost(url: string, response?: unknown) {
  return mockHttpRequest({ url, method: 'POST', response })
}

export function mockHttpPatch(url: string) {
  return mockHttpRequest({ url, method: 'PATCH' })
}

export function mockHttpPut(url: string) {
  return mockHttpRequest({ url, method: 'PUT' })
}

export function mockHttpDelete(url: string) {
  return mockHttpRequest({ url, method: 'DELETE' })
}