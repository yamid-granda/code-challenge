import { IApiResponse, IApiResponseMetadata, IHttpMethod } from "@/types";

interface IHttpRequestConfig<Body> {
  url: string
  method: IHttpMethod
  path?: string
  body?: Body
  config?: RequestInit
  searchParams?: Record<string, string>
  urlSearchParams?: URLSearchParams
}

const headers: HeadersInit = {
  "Content-type": "application/json",
}

export async function httpRequest<Response, Body = unknown>(
  requestConfig: IHttpRequestConfig<Body>,
): Promise<IApiResponse<Response>> {
  const {
    url,
    method,
    body,
    path,
    config,
    searchParams,
    urlSearchParams,
  } = requestConfig

  try {
    const bodyConfig = JSON.stringify(body)
    let urlConfig = url

    if (path) urlConfig += `${path}/`
    if (searchParams && !urlSearchParams) urlConfig += `?${new URLSearchParams(searchParams).toString()}`
    if (urlSearchParams) urlConfig += `?${urlSearchParams.toString()}`

    const fetchResponse = await fetch(urlConfig, {
      headers,
      ...config,
      method,
      body: bodyConfig,
    })

    if (!fetchResponse.ok)
      return { isOk: false }

    const response = await fetchResponse.json()

    if (response?.results) {
      const { results, ...restResponse } = response
      const metadata = restResponse as IApiResponseMetadata

      return {
        isOk: true,
        response: results,
        metadata: {
          ...metadata,
          next: metadata.next ?? '',
          previous: metadata.previous ?? '',
        },
      }
    }

    return {
      isOk: true,
      response,
      metadata: {
        next: '',
        previous: '',
        count: 0
      }
    }
  }

  catch (error) {
    return { isOk: false }
  }
}