import { IProduct } from "@/modules/Products/types"
import { IPublicDocument } from "@/types"
import { ReactNode } from "react"

export interface IOrder extends IPublicDocument {
  created: string
  paid: boolean
  discounts: number
}

export interface IOrderReport extends IPublicDocument {
  created: string
  paid: boolean
  discounts: number
  subtotal: number
  taxes: number
  products: IOrderReportProducts
  rounds: IOrderReportRound[]
}

export type IOrderReportProducts = Record<string, IProduct>

export interface IOrderReportRound {
  id: IPublicDocument['id']
  created: string
  round_products: IOrderReportProduct[]
}

export interface IOrderReportProduct {
  quantity: number
  product_id: IPublicDocument['id']
}

export interface IOrderReportFormattedProduct {
  id: IPublicDocument['id']
  quantity: number
  productName: string
  price: string | ReactNode
  unitPrice: string | ReactNode
}

export interface IAddOrderBody {
  paid?: boolean
  discounts?: number
}

export interface IAddRoundBody {
  order_id: IPublicDocument['id']
}

export interface IOrderProduct {
  id: IPublicDocument['id']
  quantity: number
}

export interface IRoundProduct extends IPublicDocument {
  quantity: number
  price: number
  round_id: IPublicDocument['id']
  product_id: IPublicDocument['id']
}

export interface IRoundProductBody {
  quantity: number
  price: number
  round_id: IPublicDocument['id']
  product_id: IPublicDocument['id']
}

export type IOrderStatus = 'Pending' | 'Paid'

export interface IUpdateOrderBody {
  discounts?: number
}