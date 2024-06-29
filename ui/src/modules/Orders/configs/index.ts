import { DEV_API_URL } from "@/configs"
import { IApiConfig } from "@/types"

export const ORDERS_EMOJI = '📋'
export const ORDERS_TITLE_TEXT = 'Orders'

// ui paths
export const ORDERS_UI_PATH = '/orders'
export const ADD_ORDER_UI_PATH = `${ORDERS_UI_PATH}/add`

// api configs
const ORDERS_API_URL = `${DEV_API_URL}/orders/api/v1/orders/`

export const GET_ORDERS_API_CONFIG: IApiConfig = {
  method: 'GET',
  url: ORDERS_API_URL,
}

export const GET_ORDER_API_CONFIG: IApiConfig = {
  method: 'GET',
  url: ORDERS_API_URL,
  path: 'report'
}

export const ADD_ORDER_API_CONFIG: IApiConfig = {
  method: 'POST',
  url: ORDERS_API_URL,
}