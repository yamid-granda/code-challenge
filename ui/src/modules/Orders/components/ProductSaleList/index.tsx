import Button from "@/components/Button";
import { IProductSaleListItem, IProductSaleListProps } from "./types";

export default function ProductSaleList(props: Readonly<IProductSaleListProps>) {
  const {
    items,
    productsById,
    onItemSum,
    onItemSubtract,
    onItemRemove,
  } = props

  function handleItemSum(item: IProductSaleListItem) {
    onItemSum?.(item)
  }

  function handleItemSubtract(item: IProductSaleListItem) {
    onItemSubtract?.(item)
  }

  function handleItemRemove(item: IProductSaleListItem) {
    onItemRemove?.(item)
  }

  return items.length
    ? (
      <ol className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        {items.map(product => (
          <li
            className="flex items-center hover:bg-gray-50 dark:hover:bg-gray-700"
            key={product.id}
          >
            <Button
              className="mr-1"
              size="xs"
              onClick={() => handleItemSubtract(product)}
            >
              -
            </Button>

            <Button
              className="mr-2"
              size="xs"
              disabled={product.quantity >= productsById[product.id].quantity}
              onClick={() => handleItemSum(product)}
            >
              +
            </Button>

            {product.text}

            <Button
              className="ml-auto"
              size="xs"
              onClick={() => handleItemRemove(product)}>
              remove
            </Button>
          </li>
        ))}
      </ol>
    )
    : null
};
