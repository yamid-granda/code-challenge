import { IProduct } from "@/modules/Products/types"

export interface IProductSingleSelectorProps {
  name?: string,
  label?: string,
  onChange?: (value: string | number) => void
  onLoadProducts?: (value: IProduct[]) => void
}