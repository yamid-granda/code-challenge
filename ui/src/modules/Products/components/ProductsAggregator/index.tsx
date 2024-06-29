import Form from "@/components/Form";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import { IProductsAggregatorForm } from "./types";
import { IOnFormChangeConfig } from "@/types";
import { addProductFromApi } from "../../services/addProductFromApi";

export default function ProductsAggregator() {
  const [isAdding, setIsAdding] = useState(false);

  const [form, setForm] = useState<IProductsAggregatorForm>({
    name: '',
    price: 0,
    quantity: 0,
  });

  function onChange(config: IOnFormChangeConfig<IProductsAggregatorForm>) {
    const { key, value } = config
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function onSubmit() {
    setIsAdding(true)
    const addResponse = await addProductFromApi({ body: form })

    if (!addResponse.isOk)
      return

    console.log('success', addResponse);
  }

  return (
    <Form
      actions={<Button>Add a new Product</Button>}
      onSubmit={onSubmit}
    >
      <Input
        label="Name"
        name="product-name"
        placeholder="My new product name"
        required
        onChange={value => onChange({ value, key: 'name' })}
      />

      <Input
        label="Price"
        name="product-price"
        placeholder="Selling price"
        type="number"
        required
        min={0}
        onChange={value => onChange({ value, key: 'price' })}
      />

      <Input
        label="Quantity"
        name="product-quantity"
        placeholder="Stock quantity"
        type="number"
        required
        min={0}
        onChange={value => onChange({ value, key: 'quantity' })}
      />
    </Form>
  )
}