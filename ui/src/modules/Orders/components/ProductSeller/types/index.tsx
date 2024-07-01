import { IOrderProduct } from "@/modules/Orders/types"
import { IProduct } from "@/modules/Products/types"
import { PropsWithRef } from "react"

interface IProductSellerBaseProps {
  label?: string
  name?: string
  submitButtonText?: string
  isLoading?: boolean
  onAdd?: (value: IOrderProduct) => void
  onSubmit?: (form: IProductSellerSubmitData) => void
}

export type IProductSellerProps = IProductSellerBaseProps

export interface IProductSellerSubmitData {
  discounts: number,
  products: Record<string, IOrderProduct>
  productsById: Record<string, IProduct>
}

export interface IProductSellerRef {
  cleanForm: () => void
}