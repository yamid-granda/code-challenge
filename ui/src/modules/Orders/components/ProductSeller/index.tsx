import Input from "@/components/Input";
import ProductSingleSelector from "@/modules/Products/components/ProductSingleSelector";
import { IProductSellerProps, IProductSellerRef } from "./types";
import Button from "@/components/Button";
import { IOrderProduct } from "@/modules/Orders/types";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { IOnFormChangeConfig } from "@/types";
import Form from "@/components/Form";
import Section from "@/components/Section";
import ProductSaleList from "@/modules/Orders/components/ProductSaleList";
import { IProductSaleListItem } from "@/modules/Orders/components/ProductSaleList/types";
import { IProduct } from "@/modules/Products/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { cloneDeep } from "lodash";
import CurrencyFormat from "@/components/CurrencyFormat";

const ProductSeller = forwardRef((props: Readonly<IProductSellerProps>, ref) => {
  const {
    name,
    label,
    submitButtonText,
    isLoading,
    formChildren,
    onAdd,
    onSubmit,
    onChangeSubtotal,
  } = props

  const [orderProduct, setOrderProduct] = useState<IOrderProduct>({
    id: 0,
    quantity: 1,
  });

  const [products, setProducts] = useState<Record<string, IOrderProduct>>({});
  const [productsById, setProductsById] = useState<Record<string, IProduct>>({});

  const componentName = name ?? 'product-seller'
  const submitText = submitButtonText ?? 'Add a new Order'

  const isAddDisabled = useMemo<boolean>(() => {
    const { quantity, id } = orderProduct
    const addedQuantity = products[orderProduct.id]?.quantity || 0
    const totalQuantity = quantity + addedQuantity
    const productQuantity = productsById[orderProduct.id]?.quantity || 0

    return !id
      || quantity <= 0
      || totalQuantity > productQuantity
  }, [orderProduct, products, productsById])

  const hasProducts = useMemo(() => Boolean(Object.keys(products).length), [products])

  const subtotal = useMemo<number>(() => {
    return Object.values(products).reduce((price, { id, quantity }) => {
      const product = productsById[id]
      price += (product.price * quantity)
      return price
    }, 0)
  }, [products])

  const productSaleList = useMemo<IProductSaleListItem[]>(() => Object.values(products).map(({ id, quantity }) => {
    const product = productsById[id]
    const total = formatCurrency(product.price * quantity)

    return {
      id: String(id),
      text: `${quantity} ${product.name}: ${total}`,
      quantity,
    }
  }), [products, productsById])

  useEffect(() => {
    onChangeSubtotal?.(subtotal)
  }, [subtotal])

  function onChange(config: IOnFormChangeConfig<IOrderProduct>) {
    const { key, value } = config
    setOrderProduct(prev => ({ ...prev, [key]: value }))
  }

  function handleAdd(item: IOrderProduct) {
    const newValue = cloneDeep(products)
    const product = newValue[item.id]

    if (!product) {
      newValue[item.id] = item
      setProducts(newValue)
      return
    }

    product.quantity += item.quantity
    setProducts(newValue)
  }

  function onAddProductSubmit() {
    handleAdd(orderProduct)
    onAdd?.(orderProduct)
    setOrderProduct(prev => ({ ...prev, quantity: 1 }))
  }

  function handleLoadProducts(products: IProduct[]) {
    const newProductsById = products.reduce((dic, product) => {
      dic[product.id] = product
      return dic
    }, {} as Record<string, IProduct>)

    setProductsById({ ...productsById, ...newProductsById })
  }

  function onItemSum({ id }: IProductSaleListItem) {
    const newValue = cloneDeep(products)
    newValue[id].quantity += 1
    setProducts(newValue)
  }

  function onItemSubtract({ id }: IProductSaleListItem) {
    const newValue = cloneDeep(products)
    const product = newValue[id]

    if (product.quantity <= 1)
      return

    product.quantity -= 1
    setProducts(newValue)
  }

  function onItemRemove({ id }: IProductSaleListItem) {
    const newValue = cloneDeep(products)
    delete newValue[id]
    setProducts(newValue)
  }

  function handleSubmit() {
    if (!hasProducts) return

    onSubmit?.({
      products,
      productsById,
    })
  }

  function cleanForm() {
    setProducts({})
  }

  useImperativeHandle<unknown, IProductSellerRef>(ref, () => {
    return {
      cleanForm,
    }
  })

  return (
    <>
      <Section>
        <Form
          className="flex flex-wrap gap-4 items-end"
          onSubmit={onAddProductSubmit}
        >
          <div className="grow">
            <ProductSingleSelector
              name={`${componentName}-product`}
              label={label}
              onChange={value => onChange({ value, key: 'id' })}
              onLoadProducts={handleLoadProducts}
            />
          </div>

          <div className="basis-24">
            <Input
              name={`${componentName}-quantity`}
              type="number"
              value={orderProduct.quantity}
              min={1}
              onChange={value => onChange({ value, key: 'quantity' })}
            />
          </div>

          <Button disabled={isAddDisabled}>Add</Button>
        </Form>
      </Section>

      <Section>
        <ProductSaleList
          items={productSaleList}
          productsById={productsById}
          onItemSum={onItemSum}
          onItemSubtract={onItemSubtract}
          onItemRemove={onItemRemove}
        />
      </Section>

      <Section>
        Subtotal: <CurrencyFormat value={subtotal} />
      </Section>

      <Form onSubmit={handleSubmit}>
        {formChildren}

        <Button
          disabled={!hasProducts}
          isLoading={isLoading}
        >
          {submitText}
        </Button>
      </Form>
    </>
  )
})

export default ProductSeller