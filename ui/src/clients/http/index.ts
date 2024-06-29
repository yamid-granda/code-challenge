import { IApiResponse, IHttpMethod } from "@/types";

interface IHttpRequestConfig {
  url: string
  method: IHttpMethod
  path?: string
  body?: unknown
  config?: RequestInit
}

const headers: HeadersInit = {
  "Content-type": "application/json",
}

export async function httpRequest<T>(requestConfig: IHttpRequestConfig): Promise<IApiResponse<T>> {
  const {
    url,
    method,
    body,
    path,
    config,
  } = requestConfig

  try {
    const bodyConfig = JSON.stringify(body)
    let urlConfig = url

    if (path) urlConfig += `${path}/`

    const fetchResponse = await fetch(urlConfig, {
      headers,
      ...config,
      method,
      body: bodyConfig,
    })

    if (!fetchResponse.ok)
      return { isOk: false }

    const response = await fetchResponse.json() as T

    return {
      isOk: true,
      response,
    }
  }

  catch (error) {
    return { isOk: false }
  }
}