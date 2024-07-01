import { IOrderProduct } from "@/modules/Orders/types"
import { IProduct } from "@/modules/Products/types"
import { ReactNode } from "react"

export interface IProductSellerProps {
  label?: string
  name?: string
  submitButtonText?: string
  isLoading?: boolean
  formChildren?: ReactNode
  onAdd?: (value: IOrderProduct) => void
  onSubmit?: (form: IProductSellerSubmitData) => void
  onChangeSubtotal?: (value: number) => void
}

export interface IProductSellerSubmitData {
  products: Record<string, IOrderProduct>
  productsById: Record<string, IProduct>
}

export interface IProductSellerRef {
  cleanForm: () => void
}