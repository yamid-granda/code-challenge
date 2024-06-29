// http
export interface IPublicDocument {
  id: number
}

interface ISuccessApiResponse<T> {
  response: T
  isOk: true
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
}

// forms
export interface IOnFormChangeConfig<T> {
  key: keyof T
  value: string
}