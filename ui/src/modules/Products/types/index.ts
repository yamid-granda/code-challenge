import { IPublicDocument } from "@/types"

export interface IProduct extends IPublicDocument {
  name: string
  price: number
  quantity: number
}

export interface IAddProductBody {
  name: string
  price: number
  quantity: number
  productTypeId?: string
}