import Form from "@/components/Form";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import { IProductsAggregatorForm } from "./types";
import { IOnFormChangeConfig } from "@/types";
import { addProductFromApi } from "../../services/addProductFromApi";
import FormGrid from "@/components/FormGrid";
import Card from "@/components/Card";

const formInitialValue = {
  name: '',
  price: 0,
  quantity: 0,
}

export default function ProductsAggregator() {
  const [isAdding, setIsAdding] = useState(false);

  const [form, setForm] = useState<IProductsAggregatorForm>(formInitialValue);

  function onChange(config: IOnFormChangeConfig<IProductsAggregatorForm>) {
    const { key, value } = config
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function onSubmit() {
    if (isAdding)
      return

    setIsAdding(true)
    await addProductFromApi({ body: form })
    setIsAdding(false)
    setForm(formInitialValue)
  }

  return (
    <Form
      onSubmit={onSubmit}
    >
      <Card>
        <FormGrid>
          <Input
            value={form.name}
            label="Name"
            name="product-name"
            placeholder="My new product name"
            required
            onChange={value => onChange({ value, key: 'name' })}
          />

          <Input
            value={form.price}
            label="Price"
            name="product-price"
            placeholder="Selling price"
            type="number"
            required
            min={0}
            onChange={value => onChange({ value, key: 'price' })}
          />

          <Input
            value={form.quantity}
            label="Quantity"
            name="product-quantity"
            placeholder="Stock quantity"
            type="number"
            required
            min={0}
            onChange={value => onChange({ value, key: 'quantity' })}
          />
        </FormGrid>

        <Button>Add a new Product</Button>
      </Card>
    </Form>
  )
}