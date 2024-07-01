import { IPublicDocument } from "@/types"

export interface IProduct extends IPublicDocument {
  name: string
  price: number
  quantity: number
  product_type_id: IPublicDocument['id'] | null
}

export interface IAddProductBody {
  name: string
  price: number
  quantity: number
  productTypeId?: string
}