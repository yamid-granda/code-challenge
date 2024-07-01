// http
export interface IPublicDocument {
  id: number
}

interface ISuccessApiResponse<T> {
  response: T
  isOk: true
  metadata: IApiResponseMetadata
}

interface IErrorApiResponse {
  isOk: false
}

export type IApiResponse<T> = ISuccessApiResponse<T> | IErrorApiResponse

export type IHttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface IApiConfig {
  method: IHttpMethod
  url: string
  path?: string
  searchParams?: Record<string, string>
}

export interface IApiResponseMetadata {
  count: number
  next: string
  previous: string
}

// forms
export interface IOnFormChangeConfig<T> {
  key: keyof T
  value: string
}