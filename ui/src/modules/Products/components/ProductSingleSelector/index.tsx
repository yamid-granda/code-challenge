import SingleSelector from "@/components/SingleSelector";
import { IProductSingleSelectorProps, IProductSingleSelectorRef } from "./types";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { IProduct } from "../../types";
import { getProductsFromApi } from "../../services/getProductsFromApi";
import { ISelectorOption } from "@/components/SingleSelector/types";
import { formatCurrency } from "@/utils/formatCurrency";

const ProductSingleSelector = forwardRef((props: Readonly<IProductSingleSelectorProps>, ref) => {
  const {
    label,
    name,
    onChange,
    onLoadProducts,
  } = props

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const options = useMemo<ISelectorOption[]>(() => {
    return products.map(product => ({
      text: `${product.name} - ${formatCurrency(product.price)} - stock: ${product.quantity}`,
      value: product.id,
    }))
  }, [products])

  async function getProducts() {
    setIsLoading(true)
    const apiResponse = await getProductsFromApi()
    setIsLoading(false);

    if (!apiResponse.isOk) {
      return;
    }

    const productsResponse = apiResponse.response
    setProducts(productsResponse);
    onLoadProducts?.(productsResponse)
  }

  useEffect(() => {
    getProducts()
  }, []);

  useImperativeHandle<unknown, IProductSingleSelectorRef>(ref, () => {
    return {
      getProducts
    }
  })

  return <SingleSelector
    options={options}
    label={label ?? 'Product'}
    name={name ?? 'product'}
    onChange={onChange}
  />
})

export default ProductSingleSelector