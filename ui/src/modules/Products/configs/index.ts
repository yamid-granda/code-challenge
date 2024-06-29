import { DEV_API_URL } from "@/configs"
import { IApiConfig } from "@/types"

export const PRODUCTS_EMOJI = '📦'
export const PRODUCTS_TITLE_TEXT = 'Products'

// ui paths
export const PRODUCTS_UI_PATH = '/products'
export const ADD_PRODUCT_UI_PATH = `${PRODUCTS_UI_PATH}/add`

// api configs
const PRODUCTS_API_URL = `${DEV_API_URL}/products/api/v1/products/`

export const GET_PRODUCTS_API_CONFIG: IApiConfig = {
  method: 'GET',
  url: PRODUCTS_API_URL,
}

export const ADD_PRODUCT_API_CONFIG: IApiConfig = {
  method: 'POST',
  url: PRODUCTS_API_URL,
}