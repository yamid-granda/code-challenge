import { IProduct } from "@/modules/Products/types"

export interface IProductSaleListItem {
  id: string
  text: string
  quantity: number
}

export interface IProductSaleListProps {
  items: IProductSaleListItem[]
  productsById: Record<string, IProduct>
  onItemSum?: (item: IProductSaleListItem) => void
  onItemSubtract?: (item: IProductSaleListItem) => void
  onItemRemove?: (item: IProductSaleListItem) => void
}