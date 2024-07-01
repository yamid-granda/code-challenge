import { DEV_API_URL } from "@/configs"
import { IApiConfig } from "@/types"

export const ORDERS_EMOJI = '📋'
export const ORDERS_TITLE_TEXT = 'Orders'

// ui paths
export const ORDERS_UI_PATH = '/orders'
export const ADD_ORDER_UI_PATH = `${ORDERS_UI_PATH}/add`

// api configs
const ORDERS_API_URL = `${DEV_API_URL}/orders/api/v1/orders/`
const ROUNDS_API_URL = `${DEV_API_URL}/rounds/api/v1/rounds/`
const ROUND_PRODUCTS_API_URL = `${DEV_API_URL}/round_products/api/v1/round_products/`

// get
export const GET_ORDERS_API_CONFIG: IApiConfig = {
  method: 'GET',
  url: ORDERS_API_URL,
  path: 'reports',
  searchParams: { ordering: '-created', limit: "20" }
}

export const GET_ORDER_API_CONFIG: IApiConfig = {
  method: 'GET',
  url: ORDERS_API_URL,
  path: 'report'
}

// post
export const ADD_ORDER_API_CONFIG: IApiConfig = {
  method: 'POST',
  url: ORDERS_API_URL,
}

export const ADD_ROUND_API_CONFIG: IApiConfig = {
  method: 'POST',
  url: ROUNDS_API_URL,
}

export const ADD_ROUND_PRODUCT_API_CONFIG: IApiConfig = {
  method: 'POST',
  url: ROUND_PRODUCTS_API_URL,
}

// patch
export const MARK_PAID_ORDER_API_CONFIG: IApiConfig = {
  method: 'PATCH',
  url: ORDERS_API_URL,
}